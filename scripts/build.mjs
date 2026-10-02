/* Build de produção: gera a pasta dist/ pronta para publicar.
   Uso: npm run build

   O que faz:
   1. Junta e minifica todo o JavaScript em um único arquivo (esbuild), com hash no nome.
   2. Junta e minifica os arquivos CSS em um único arquivo, com hash no nome.
   3. Otimiza e copia só as imagens que as páginas realmente usam.
   4. Gera o HTML apontando para os arquivos novos.
   5. Mostra um relatório de tamanhos. */
import { build, transform } from "esbuild";
import sharp from "sharp";
import { readFile, writeFile, mkdir, rm, cp, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";
import path from "node:path";

const DIST = "dist";
const ORDEM_CSS = ["tokens", "base", "layout", "components", "navegacao", "spa"];

const hash = (conteudo) => createHash("sha256").update(conteudo).digest("hex").slice(0, 8);
const gz = (conteudo) => gzipSync(conteudo, { level: 9 }).length;
const kb = (bytes) => (bytes / 1024).toFixed(1).padStart(6) + " KB";

async function listarArquivos(pasta, extensao) {
  const itens = await readdir(pasta, { withFileTypes: true, recursive: true });
  return itens
    .filter((i) => i.isFile() && i.name.endsWith(extensao))
    .map((i) => path.join(i.parentPath ?? i.path, i.name))
    .filter((caminho) => !caminho.includes(`${path.sep}vendor${path.sep}`));
}

/* --- Otimização de uma imagem ---
   PNG: reduz a paleta de cores. WebP: gerado a partir do PNG original (evita recomprimir
   uma imagem que já tinha perdas). JPG: mozjpeg. SVG: remove espaços e comentários.
   Se o resultado não ficar menor que o original, o original é mantido. */
async function otimizarImagem(origem, destino) {
  const original = await readFile(origem);
  const extensao = path.extname(origem).toLowerCase();
  let otimizado = original;

  if (extensao === ".png") {
    otimizado = await sharp(original).png({ palette: true, quality: 85, effort: 10, compressionLevel: 9 }).toBuffer();
  } else if (extensao === ".webp") {
    const irmaoPng = origem.replace(/\.webp$/, ".png");
    const fonte = await readFile(irmaoPng).catch(() => original);
    otimizado = await sharp(fonte).webp({ quality: 82, effort: 6 }).toBuffer();
  } else if (extensao === ".jpg" || extensao === ".jpeg") {
    otimizado = await sharp(original).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  } else if (extensao === ".svg") {
    otimizado = Buffer.from(
      original.toString("utf8").replace(/<!--[\s\S]*?-->/g, "").replace(/>\s+</g, "><").replace(/\s{2,}/g, " ").trim(),
    );
  }

  if (otimizado.length >= original.length) otimizado = original;
  await writeFile(destino, otimizado);
  return { antes: original.length, depois: otimizado.length };
}

const medidas = { css: { antes: 0, antesGz: 0 }, js: { antes: 0, antesGz: 0 } };

/* ---------- limpar ---------- */
await rm(DIST, { recursive: true, force: true });
await mkdir(path.join(DIST, "js"), { recursive: true });
await mkdir(path.join(DIST, "css"), { recursive: true });
await mkdir(path.join(DIST, "imagens"), { recursive: true });
await mkdir(path.join(DIST, "vendor"), { recursive: true });
await mkdir(path.join(DIST, "html"), { recursive: true });

/* ---------- 1) JavaScript ---------- */
const arquivosJs = await listarArquivos("js", ".js");
for (const arquivo of arquivosJs) {
  const texto = await readFile(arquivo);
  medidas.js.antes += texto.length;
  medidas.js.antesGz += gz(texto);
}
const resultadoJs = await build({
  entryPoints: ["js/main.js"],
  bundle: true,
  minify: true,
  format: "esm",
  target: "es2020",
  legalComments: "none",
  write: false,
});
const codigoJs = resultadoJs.outputFiles[0].contents;
const nomeJs = `main.${hash(codigoJs)}.js`;
await writeFile(path.join(DIST, "js", nomeJs), codigoJs);

/* ---------- 2) CSS ---------- */
let cssJunto = "";
for (const nome of ORDEM_CSS) {
  const texto = await readFile(`css/${nome}.css`);
  medidas.css.antes += texto.length;
  medidas.css.antesGz += gz(texto);
  cssJunto += `/* ${nome}.css */\n${texto}\n`;
}
const cssMin = (await transform(cssJunto, { loader: "css", minify: true, legalComments: "none" })).code;
const nomeCss = `styles.${hash(cssMin)}.css`;
await writeFile(path.join(DIST, "css", nomeCss), cssMin);

/* ---------- 3) Biblioteca externa (já vem minificada) ---------- */
await cp("js/vendor/chart.umd.js", path.join(DIST, "vendor", "chart.umd.js"));
await cp("js/vendor/chart.js-LICENSE.md", path.join(DIST, "vendor", "chart.js-LICENSE.md"));

/* ---------- 4) Imagens: só as que o site usa ---------- */
const fontesDeReferencia = [
  await readFile("html/index.html", "utf8"),
  ...(await Promise.all((await listarArquivos("js", ".js")).map((f) => readFile(f, "utf8")))),
];
const usadas = new Set();
for (const texto of fontesDeReferencia) {
  for (const m of texto.matchAll(/imagens\/([\w.-]+\.(?:svg|png|webp|jpe?g))/g)) usadas.add(m[1]);
}
const imagens = [];
for (const nome of [...usadas].sort()) {
  const r = await otimizarImagem(path.join("imagens", nome), path.join(DIST, "imagens", nome));
  imagens.push({ nome, ...r });
}
const totalImagens = (campo) => imagens.reduce((soma, i) => soma + i[campo], 0);

/* ---------- 5) HTML ---------- */
let html = await readFile("html/index.html", "utf8");
html = html.replace(/\s*<link rel="stylesheet" href="\.\.\/css\/[\w.-]+\.css">/g, "");
html = html.replace("</head>", `  <link rel="stylesheet" href="../css/${nomeCss}">\n</head>`);
html = html.replace(/src="\.\.\/js\/main\.js"/, `src="../js/${nomeJs}"`);
html = html.replace(/<!--[\s\S]*?-->/g, "").split("\n").map((l) => l.trim()).filter(Boolean).join("\n");
await writeFile(path.join(DIST, "html", "index.html"), html);
await cp("index.html", path.join(DIST, "index.html"));

/* ---------- Relatório ---------- */
const linha = (nome, antes, antesGz, depois, depoisGz) =>
  `${nome.padEnd(24)} ${kb(antes)} ${kb(antesGz)}   ->  ${kb(depois)} ${kb(depoisGz)}`;
console.log("\nRelatório do build (tamanho  |  comprimido com gzip)\n");
console.log("                           antes                     depois");
console.log(linha(`JavaScript (${arquivosJs.length} arquivos)`, medidas.js.antes, medidas.js.antesGz, codigoJs.length, gz(codigoJs)));
console.log(linha(`CSS (${ORDEM_CSS.length} arquivos)`, medidas.css.antes, medidas.css.antesGz, cssMin.length, gz(cssMin)));
for (const i of imagens) console.log(linha(`imagem ${i.nome}`, i.antes, i.antes, i.depois, i.depois));
console.log(`\nRequisições de JS e CSS: ${arquivosJs.length + ORDEM_CSS.length} -> 2`);
console.log(`Saída: ${DIST}/js/${nomeJs} | ${DIST}/css/${nomeCss}\n`);

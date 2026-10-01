/* Templates reutilizáveis: cada função recebe dados e devolve um trecho de HTML.
   Todo texto dinâmico passa por escapeHTML antes de entrar no template. */
import { escapeHTML as e } from "../core/dom.js";

export const badge = ({ texto, tipo = "" }) =>
  `<span class="badge${tipo ? ` badge--${e(tipo)}` : ""}">${e(texto)}</span>`;

export const alerta = ({ texto, tipo = "", papel = "note" }) =>
  `<p class="alerta${tipo ? ` alerta--${e(tipo)}` : ""}" role="${e(papel)}">${e(texto)}</p>`;

/* Lista de definição (dt/dd) usada nos cartões de projetos e de apoiadores. */
export const listaDetalhes = (detalhes) =>
  `<dl>${Object.entries(detalhes).map(([rotulo, valor]) => `<dt>${e(rotulo)}</dt><dd>${e(valor)}</dd>`).join("")}</dl>`;

/* Cartão inteiro clicável que leva a outra rota. */
export const cartaoLink = ({ titulo, texto, rotulo, href }) => `
  <article class="card card--link col-12 col-md-4">
    <h3>${e(titulo)}</h3>
    <p>${e(texto)}</p>
    <a href="${e(href)}">${e(rotulo)}</a>
  </article>`;

/* Cartão de projeto gerado a partir de um objeto do arquivo data/projetos.js. */
export const cartaoProjeto = (projeto) => `
  <article class="card projeto col-12 col-sm-6 col-lg-4" id="${e(projeto.id)}" aria-labelledby="titulo-${e(projeto.id)}">
    <header>
      <h2 id="titulo-${e(projeto.id)}">${e(projeto.titulo)}</h2>
      ${badge(projeto.badge)}
    </header>
    <p>${e(projeto.texto)}</p>
    ${listaDetalhes(projeto.detalhes)}
  </article>`;

/* Campos de formulário: rótulo, controle, dica e área de erro, todos ligados por id (acessibilidade). */
function descricao(id, dica) {
  return [dica ? `${id}-dica` : "", `${id}-erro`].filter(Boolean).join(" ");
}

export const campo = ({ id, rotulo, tipo = "text", colunas = "col-12", obrigatorio = true, dica = "", atributos = "" }) => `
  <div class="campo ${colunas}">
    <label for="${id}">${e(rotulo)}${obrigatorio ? " *" : ""}</label>
    <input type="${tipo}" id="${id}" name="${id}"${obrigatorio ? " required" : ""} aria-describedby="${descricao(id, dica)}" ${atributos}>
    ${dica ? `<span id="${id}-dica" class="dica">${e(dica)}</span>` : ""}
    <p id="${id}-erro" class="erro"></p>
  </div>`;

export const campoSelect = ({ id, rotulo, opcoes, colunas = "col-12", obrigatorio = true, dica = "" }) => `
  <div class="campo ${colunas}">
    <label for="${id}">${e(rotulo)}${obrigatorio ? " *" : ""}</label>
    <select id="${id}" name="${id}"${obrigatorio ? " required" : ""} aria-describedby="${descricao(id, dica)}">
      <option value="">Selecione</option>
      ${opcoes.map(([valor, texto]) => `<option value="${e(valor)}">${e(texto)}</option>`).join("")}
    </select>
    ${dica ? `<span id="${id}-dica" class="dica">${e(dica)}</span>` : ""}
    <p id="${id}-erro" class="erro"></p>
  </div>`;

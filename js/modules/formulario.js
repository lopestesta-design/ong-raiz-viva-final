/* Comportamento do formulário de cadastro: máscaras, validação com feedback,
   rascunho automático e gravação no localStorage. */
import { qs, qsa, debounce } from "../core/dom.js";
import { aplicarMascaras } from "./mascaras.js";
import { regras, validarCampo, validarTudo } from "./validacao.js";
import { adicionar, cpfJaCadastrado, lerRascunho, salvarRascunho, apagarRascunho } from "../data/apoiadores.js";
import { mostrarToast } from "./feedback.js";

/* ---------- leitura e escrita dos dados do formulário ---------- */
function coletarDados(form) {
  const dados = { areas: [] };
  for (const [nome, valor] of new FormData(form).entries()) {
    if (nome === "areas") dados.areas.push(valor);
    else dados[nome] = typeof valor === "string" ? valor.trim() : valor;
  }
  dados.lgpd = form.elements.lgpd.checked;
  return dados;
}

function preencher(form, dados) {
  for (const [nome, valor] of Object.entries(dados)) {
    if (nome === "areas") {
      qsa('input[name="areas"]', form).forEach((c) => { c.checked = valor.includes(c.value); });
    } else if (nome === "tipo") {
      qsa('input[name="tipo"]', form).forEach((r) => { r.checked = r.value === valor; });
    } else if (nome === "lgpd") {
      form.elements.lgpd.checked = Boolean(valor);
    } else if (form.elements[nome]) {
      form.elements[nome].value = valor;
    }
  }
}

/* Um rascunho só vale a pena se a pessoa realmente preencheu alguma coisa. */
function temConteudo(dados) {
  return Object.entries(dados).some(([nome, valor]) =>
    nome === "areas" ? valor.length > 0 : typeof valor === "boolean" ? valor : String(valor).trim() !== "");
}

/* ---------- feedback de erro (ligado por aria-invalid + aria-describedby) ---------- */
function elementoDoCampo(form, nome) {
  const el = form.elements[nome];
  return el instanceof RadioNodeList ? el[0] : el;
}

function mostrarErro(form, nome, mensagem) {
  const erro = qs(`#${nome}-erro`, form);
  if (erro) erro.textContent = mensagem;
  const campo = elementoDoCampo(form, nome);
  if (!campo || nome === "tipo") return;
  /* erro: vermelho; válido e preenchido: verde; vazio e opcional: sem destaque */
  if (mensagem) campo.setAttribute("aria-invalid", "true");
  else if (campo.type === "checkbox" || campo.value.trim() !== "") campo.setAttribute("aria-invalid", "false");
  else campo.removeAttribute("aria-invalid");
}

function limparErros(form) {
  qsa(".erro", form).forEach((p) => { p.textContent = ""; });
  qsa("[aria-invalid]", form).forEach((c) => c.removeAttribute("aria-invalid"));
}

function validarEMostrar(form, nome) {
  const dados = coletarDados(form);
  mostrarErro(form, nome, validarCampo(nome, dados[nome], dados));
}

/* ---------- inicialização ---------- */
export function iniciarFormulario(raiz) {
  const form = qs("#form-cadastro", raiz);
  if (!form) return;

  aplicarMascaras(form);

  /* quem tem menos de 18 anos não pode escolher data posterior a hoje - 18 anos */
  const hoje = new Date();
  form.elements.nascimento.max = new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate()).toISOString().slice(0, 10);

  /* recupera o que a pessoa já tinha digitado */
  const rascunho = lerRascunho();
  if (rascunho && temConteudo(rascunho)) {
    preencher(form, rascunho);
    mostrarToast("Recuperamos o que você já tinha preenchido.", "info");
  }

  /* salva o rascunho enquanto digita (com atraso, para não gravar a cada tecla) */
  const guardar = debounce(() => {
    const dados = coletarDados(form);
    if (temConteudo(dados)) salvarRascunho(dados);
  }, 400);
  form.addEventListener("input", guardar);
  form.addEventListener("change", guardar);

  /* valida cada campo ao sair dele (blur) */
  form.addEventListener("focusout", (e) => {
    const nome = e.target.name;
    if (nome && nome in regras && nome !== "tipo") validarEMostrar(form, nome);
  });

  /* escolher o tipo de apoio revalida os campos que dependem dele */
  form.addEventListener("change", (e) => {
    if (e.target.name === "tipo") {
      mostrarErro(form, "tipo", "");
      ["valor", "disponibilidade"].forEach((nome) => {
        if (elementoDoCampo(form, nome).hasAttribute("aria-invalid")) validarEMostrar(form, nome);
      });
    }
    if (e.target.name === "lgpd") validarEMostrar(form, "lgpd");
  });

  /* limpar formulário: apaga erros e rascunho */
  form.addEventListener("reset", () => {
    guardar.cancelar();
    limparErros(form);
    apagarRascunho();
  });

  /* envio */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = coletarDados(form);
    const erros = validarTudo(dados);

    /* consistência entre dados: o mesmo CPF não pode ser cadastrado duas vezes */
    if (!erros.cpf && cpfJaCadastrado(dados.cpf)) erros.cpf = "Este CPF já está cadastrado neste navegador.";

    limparErros(form);
    Object.keys(regras).forEach((nome) => mostrarErro(form, nome, erros[nome] ?? ""));

    const primeiro = Object.keys(erros)[0];
    if (primeiro) {
      elementoDoCampo(form, primeiro).focus();
      mostrarToast("Corrija os campos indicados e envie novamente.", "erro");
      return;
    }

    const registro = adicionar(dados);
    if (!registro) {
      mostrarToast("Não foi possível salvar. O armazenamento do navegador pode estar cheio ou bloqueado.", "erro");
      return;
    }
    guardar.cancelar();
    apagarRascunho();
    form.reset();
    mostrarToast("Cadastro salvo com sucesso!", "sucesso");
    location.hash = "#/apoiadores";
  });
}

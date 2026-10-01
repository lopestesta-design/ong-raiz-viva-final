/* Máscaras de entrada (CPF, telefone e CEP). Funções puras + ligação com os campos. */
import { somenteDigitos } from "./validacao.js";
import { qsa } from "../core/dom.js";

export function mascaraCPF(valor) {
  const d = somenteDigitos(valor).slice(0, 11);
  if (d.length > 9) return d.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  if (d.length > 6) return d.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  if (d.length > 3) return d.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  return d;
}

export function mascaraTelefone(valor) {
  const d = somenteDigitos(valor).slice(0, 11);
  if (d.length > 10) return d.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
  if (d.length > 6) return d.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
  if (d.length > 2) return d.replace(/(\d{2})(\d{1,5})/, "($1) $2");
  return d ? `(${d}` : "";
}

export function mascaraCEP(valor) {
  const d = somenteDigitos(valor).slice(0, 8);
  return d.length > 5 ? d.replace(/(\d{5})(\d{1,3})/, "$1-$2") : d;
}

const mascaras = { cpf: mascaraCPF, telefone: mascaraTelefone, cep: mascaraCEP };

/* Aplica a máscara indicada em data-mask a todos os campos dentro da raiz. */
export function aplicarMascaras(raiz) {
  qsa("[data-mask]", raiz).forEach((campo) => {
    const aplicar = mascaras[campo.dataset.mask];
    campo.addEventListener("input", () => { campo.value = aplicar(campo.value); });
  });
}

/* Utilitários de DOM reutilizados por toda a aplicação. */

export const qs = (seletor, raiz = document) => raiz.querySelector(seletor);
export const qsa = (seletor, raiz = document) => [...raiz.querySelectorAll(seletor)];

/* Escapa texto antes de inseri-lo em um template HTML (evita injeção de HTML/XSS). */
export function escapeHTML(valor) {
  const mapa = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(valor ?? "").replace(/[&<>"']/g, (caractere) => mapa[caractere]);
}

/* Delegação de eventos: um único ouvinte na raiz atende todos os elementos que casam com o seletor. */
export function delegar(raiz, evento, seletor, manipulador) {
  raiz.addEventListener(evento, (e) => {
    const alvo = e.target.closest(seletor);
    if (alvo && raiz.contains(alvo)) manipulador(e, alvo);
  });
}

/* Adia a execução até a pessoa parar de digitar.
   A função devolvida tem .cancelar() para descartar uma execução ainda pendente. */
export function debounce(funcao, espera = 400) {
  let temporizador;
  const adiada = (...argumentos) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => funcao(...argumentos), espera);
  };
  adiada.cancelar = () => clearTimeout(temporizador);
  return adiada;
}

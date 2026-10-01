/* Feedback ao usuário: toasts (avisos temporários) e modal de confirmação. */
import { qs } from "../core/dom.js";

let areaToasts;
let dialogo;

export function iniciarFeedback() {
  areaToasts = qs(".toast-area");
  dialogo = qs("#modal-confirmar");
  /* clicar no fundo escuro fecha o modal sem confirmar */
  dialogo?.addEventListener("click", (e) => { if (e.target === dialogo) dialogo.close(""); });
}

function removerToast(toast) {
  toast.classList.add("toast--saindo");
  setTimeout(() => toast.remove(), 300);
}

export function mostrarToast(mensagem, tipo = "info", tempo = 4500) {
  if (!areaToasts) return;
  const toast = document.createElement("div");
  toast.className = `toast toast--${tipo}`;

  const texto = document.createElement("p");
  texto.textContent = mensagem;                       // textContent: nunca interpreta HTML

  const fechar = document.createElement("button");
  fechar.type = "button";
  fechar.className = "toast__fechar";
  fechar.setAttribute("aria-label", "Fechar notificação");
  fechar.textContent = "\u00D7";
  fechar.addEventListener("click", () => removerToast(toast));

  toast.append(texto, fechar);
  areaToasts.append(toast);
  setTimeout(() => { if (toast.isConnected) removerToast(toast); }, tempo);
}

/* Abre o modal de confirmação e devolve uma Promise<boolean>. */
export function confirmar({ titulo, texto, rotuloConfirmar = "Confirmar" }) {
  return new Promise((resolve) => {
    qs("#confirmar-titulo").textContent = titulo;
    qs("#confirmar-texto").textContent = texto;
    qs("#confirmar-sim").textContent = rotuloConfirmar;
    dialogo.returnValue = "";
    dialogo.addEventListener("close", () => resolve(dialogo.returnValue === "sim"), { once: true });
    dialogo.showModal();
  });
}

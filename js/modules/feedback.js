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

/* Toasts de erro ficam na tela até a pessoa fechá-los. Os demais somem depois de 8 s,
   mas o tempo é pausado enquanto o mouse ou o foco estiverem sobre eles (WCAG 2.2.1). */
export function mostrarToast(mensagem, tipo = "info", tempo = 8000) {
  if (!areaToasts) return;
  const toast = document.createElement("div");
  toast.className = `toast toast--${tipo}`;
  if (tipo === "erro") toast.setAttribute("role", "alert");   // erros são anunciados na hora

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

  if (tipo === "erro") return;                         // erro: sem fechamento automático

  let temporizador;
  const iniciar = () => { temporizador = setTimeout(() => { if (toast.isConnected) removerToast(toast); }, tempo); };
  const pausar = () => clearTimeout(temporizador);
  toast.addEventListener("mouseenter", pausar);
  toast.addEventListener("focusin", pausar);
  toast.addEventListener("mouseleave", iniciar);
  toast.addEventListener("focusout", iniciar);
  iniciar();
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

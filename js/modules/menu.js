/* Menu responsivo: hambúrguer no celular e submenu (dropdown) no desktop. */
import { qs, qsa, delegar } from "../core/dom.js";

const desktop = window.matchMedia("(min-width: 48rem)");

function botaoMenu() { return qs(".menu-toggle"); }
function painel() { return qs("#menu-principal"); }

function abrirMenu(abrir) {
  painel().classList.toggle("is-open", abrir);
  botaoMenu().setAttribute("aria-expanded", String(abrir));
  botaoMenu().setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
}

function fecharSubmenus() {
  qsa(".has-submenu").forEach((item) => {
    item.classList.remove("is-open");
    qs(".submenu-toggle", item).setAttribute("aria-expanded", "false");
  });
}

/* Fecha tudo (usado pelo roteador depois de cada navegação). */
export function fecharMenus() {
  if (!botaoMenu()) return;
  abrirMenu(false);
  fecharSubmenus();
}

export function iniciarMenu() {
  if (!botaoMenu() || !painel()) return;

  botaoMenu().addEventListener("click", () => {
    abrirMenu(botaoMenu().getAttribute("aria-expanded") !== "true");
  });

  qsa(".submenu-toggle").forEach((seta) => {
    seta.addEventListener("click", () => {
      const item = seta.closest(".has-submenu");
      const abrir = !item.classList.contains("is-open");
      fecharSubmenus();
      item.classList.toggle("is-open", abrir);
      seta.setAttribute("aria-expanded", String(abrir));
    });
  });

  /* qualquer link do menu leva a outra rota: fecha o painel */
  delegar(painel(), "click", "a", fecharMenus);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    fecharSubmenus();
    if (!desktop.matches && botaoMenu().getAttribute("aria-expanded") === "true") {
      abrirMenu(false);
      botaoMenu().focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-submenu")) fecharSubmenus();
  });

  desktop.addEventListener("change", fecharMenus);
}

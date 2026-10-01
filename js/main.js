/* Ponto de entrada da aplicação: liga os módulos entre si. */
import { qs, qsa } from "./core/dom.js";
import { criarRouter } from "./router.js";
import { rotas, naoEncontrada } from "./rotas.js";
import { iniciarMenu, fecharMenus } from "./modules/menu.js";
import { iniciarFeedback } from "./modules/feedback.js";

iniciarMenu();
iniciarFeedback();

/* link "pular para o conteúdo": não pode mudar o hash (senão o roteador entenderia como rota) */
qs(".skip-link").addEventListener("click", (e) => {
  e.preventDefault();
  qs("#app").focus();
});

function marcarLinkAtivo(caminho) {
  qsa("[data-rota]").forEach((link) => {
    if (link.dataset.rota === caminho) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

criarRouter({
  raiz: qs("#app"),
  rotas,
  naoEncontrada,
  aoNavegar: ({ caminho }) => {
    marcarLinkAtivo(caminho);
    fecharMenus();
  },
});

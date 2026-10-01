/* Roteador por hash (#/rota): troca o conteúdo de #app sem recarregar a página. */
import { qs } from "./core/dom.js";

export function criarRouter({ raiz, rotas, naoEncontrada, aoNavegar }) {
  let primeiraRenderizacao = true;

  /* "#/projetos/hortas" -> { base: "/projetos", parametro: "hortas" } */
  function resolver(hash) {
    const partes = hash.replace(/^#/, "").split("/").filter(Boolean);
    const base = partes.length ? `/${partes[0]}` : "/";
    return { base, parametro: partes[1] ?? null };
  }

  function navegar() {
    /* ignora âncoras comuns (ex.: "#conteudo"): só hashes no formato "#/..." são rotas */
    if (location.hash && !location.hash.startsWith("#/")) return;

    const { base, parametro } = resolver(location.hash);
    const rota = rotas.find((r) => r.caminho === base) ?? naoEncontrada;

    raiz.innerHTML = rota.render({ parametro });
    document.title = `${rota.titulo} | Instituto Raiz Viva`;
    rota.aposRenderizar?.(raiz, { parametro });

    if (!parametro) window.scrollTo(0, 0);

    /* acessibilidade: depois de trocar de "página", leva o foco ao título */
    if (!primeiraRenderizacao) {
      const titulo = qs("h1", raiz);
      titulo?.setAttribute("tabindex", "-1");
      titulo?.focus({ preventScroll: true });
      const anuncio = qs("#anuncio");
      if (anuncio) anuncio.textContent = `Página ${rota.titulo}`;
    }
    primeiraRenderizacao = false;

    aoNavegar?.({ caminho: rota === naoEncontrada ? null : base, rota });
  }

  window.addEventListener("hashchange", navegar);
  navegar();
}

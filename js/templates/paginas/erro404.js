export const naoEncontrada = {
  caminho: "*",
  titulo: "Página não encontrada",
  render: () => `
    <section class="secao" aria-labelledby="titulo-404">
      <div class="container">
        <h1 id="titulo-404">Página não encontrada</h1>
        <p>O endereço que você abriu não existe neste site.</p>
        <a class="botao" href="#/">Voltar para o início</a>
      </div>
    </section>`,
};

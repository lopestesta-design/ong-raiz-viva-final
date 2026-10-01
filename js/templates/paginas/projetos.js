import { projetos } from "../../data/projetos.js";
import { cartaoProjeto } from "../componentes.js";

export const paginaProjetos = {
  caminho: "/projetos",
  titulo: "Projetos sociais",
  render: () => `
    <section class="secao" aria-labelledby="titulo-projetos">
      <div class="container">
        <h1 id="titulo-projetos">Projetos sociais</h1>
        <p>Três iniciativas que se completam: quem planta, aprende a cozinhar e ainda ajuda a abastecer quem está sem comida hoje.</p>
        <div class="grid">
          ${projetos.map(cartaoProjeto).join("")}
        </div>
      </div>
    </section>

    <section class="secao secao--suave" aria-labelledby="titulo-participar">
      <div class="container">
        <h2 id="titulo-participar">Como participar</h2>
        <div class="grid">
          <article class="card col-12 col-md-6" aria-labelledby="como-doar">
            <h3 id="como-doar">Quero doar</h3>
            <p>Sua doação mensal financia sementes, ferramentas e as cestas solidárias.</p>
            <ol>
              <li>Preencha o cadastro e escolha a opção "Doador".</li>
              <li>Informe o valor mensal, a partir de R$ 10.</li>
              <li>Receba por e-mail os dados de pagamento e o relatório de uso dos recursos.</li>
            </ol>
            <a class="botao" href="#/cadastro">Cadastrar como doador</a>
          </article>
          <article class="card col-12 col-md-6" aria-labelledby="como-voluntariar">
            <h3 id="como-voluntariar">Quero ser voluntário</h3>
            <p>Você escolhe a área e o horário. Não precisa de experiência prévia.</p>
            <ol>
              <li>Preencha o cadastro e escolha a opção "Voluntário".</li>
              <li>Indique sua disponibilidade e as áreas de interesse.</li>
              <li>Nossa equipe liga para combinar a primeira atividade.</li>
            </ol>
            <a class="botao" href="#/cadastro">Cadastrar como voluntário</a>
          </article>
        </div>
      </div>
    </section>`,

  /* Rota com parâmetro: #/projetos/hortas rola até o cartão do projeto. */
  aposRenderizar(raiz, { parametro }) {
    if (!parametro) return;
    const alvo = raiz.querySelector(`#${CSS.escape(parametro)}`);
    if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
  },
};

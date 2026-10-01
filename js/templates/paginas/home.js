import { numeros } from "../../data/projetos.js";
import { cartaoLink } from "../componentes.js";
import { escapeHTML as e } from "../../core/dom.js";

export const home = {
  caminho: "/",
  titulo: "Início",
  render: () => `
    <section class="hero" aria-labelledby="titulo-hero">
      <div class="container">
        <h1 id="titulo-hero">Comida boa na mesa de quem mais precisa.</h1>
        <p>Plantamos hortas nos bairros, ensinamos a cozinhar com o que se tem e entregamos cestas para famílias que passam dificuldade. Tudo isso com a ajuda de gente como você.</p>
        <div class="acoes">
          <a class="botao" href="#/cadastro">Quero ajudar</a>
          <a class="botao botao--secundario" href="#/projetos">Conhecer os projetos</a>
        </div>
      </div>
    </section>

    <section class="secao" aria-labelledby="titulo-sobre">
      <div class="container grid">
        <div class="col-12 col-md-6 col-xl-7">
          <h2 id="titulo-sobre">Quem somos</h2>
          <p>O Instituto Raiz Viva é uma organização da sociedade civil sem fins lucrativos. Nasceu de um mutirão de vizinhos que transformou um terreno abandonado em horta e hoje atua em vários bairros da cidade.</p>
          <p>Acreditamos que alimentação de qualidade é um direito e que comunidade organizada muda a realidade.</p>
          <figure class="figura">
            <picture>
              <source srcset="../imagens/horta.webp" type="image/webp">
              <img src="../imagens/horta.png" width="600" height="400" loading="lazy"
                   alt="Ilustração de uma horta com fileiras de mudas verdes brotando da terra sob um sol amarelo">
            </picture>
            <figcaption>Cada fileira é plantada em mutirão pelos moradores do bairro.</figcaption>
          </figure>
        </div>
        <div class="col-12 col-md-6 col-xl-5">
          <h2>Missão e valores</h2>
          <ul>
            <li><strong>Missão:</strong> garantir acesso a alimento saudável e a conhecimento para produzi-lo.</li>
            <li><strong>Transparência:</strong> prestamos contas de cada doação recebida.</li>
            <li><strong>Participação:</strong> as famílias atendidas ajudam a decidir o que fazemos.</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="secao secao--suave" aria-labelledby="titulo-numeros">
      <div class="container">
        <h2 id="titulo-numeros">Nosso trabalho em números</h2>
        <ul class="numeros grid">
          ${numeros.map((n) => `<li class="col-6 col-lg-3"><strong>${e(n.valor)}</strong> ${e(n.rotulo)}</li>`).join("")}
        </ul>
        <p><small>Números fictícios, usados como exemplo neste trabalho acadêmico.</small></p>
      </div>
    </section>

    <section class="secao" aria-labelledby="titulo-ajudar">
      <div class="container">
        <h2 id="titulo-ajudar">Como você pode ajudar</h2>
        <div class="grid">
          ${cartaoLink({ titulo: "Doe", texto: "Qualquer valor vira sementes, ferramentas e cestas. Você escolhe se quer doar uma vez ou todo mês.", rotulo: "Cadastrar como doador", href: "#/cadastro" })}
          ${cartaoLink({ titulo: "Seja voluntário", texto: "Ajude no plantio, nas oficinas, na organização das entregas ou na comunicação. Você define o tempo que tem.", rotulo: "Cadastrar como voluntário", href: "#/cadastro" })}
          ${cartaoLink({ titulo: "Conheça os projetos", texto: "Veja onde atuamos, quem atendemos e como cada iniciativa funciona.", rotulo: "Ver projetos sociais", href: "#/projetos" })}
        </div>
      </div>
    </section>`,
};

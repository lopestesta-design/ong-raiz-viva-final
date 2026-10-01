import { campo, campoSelect, alerta } from "../componentes.js";
import { estados } from "../../data/estados.js";
import { iniciarFormulario } from "../../modules/formulario.js";

const areas = [["hortas", "Hortas"], ["oficinas", "Oficinas"], ["cestas", "Cestas solidárias"], ["comunicacao", "Comunicação"]];

export const cadastro = {
  caminho: "/cadastro",
  titulo: "Cadastro de apoiadores",
  render: () => `
    <section class="secao" aria-labelledby="titulo-cadastro">
      <div class="container">
        <h1 id="titulo-cadastro">Cadastro de apoiadores</h1>
        <p>Preencha o formulário para doar ou ser voluntário. Campos com asterisco (*) são obrigatórios.</p>
        ${alerta({ texto: "Seus dados ficam salvos apenas neste navegador e nunca são enviados a terceiros." })}
        <div id="aviso-rascunho"></div>

        <form id="form-cadastro" class="formulario" novalidate>
          <fieldset>
            <legend>Dados pessoais</legend>
            <div class="grid">
              ${campo({ id: "nome", rotulo: "Nome completo", colunas: "col-12", atributos: 'maxlength="100" autocomplete="name"' })}
              ${campo({ id: "cpf", rotulo: "CPF", colunas: "col-12 col-md-6", dica: "Somente números; a formatação é automática.", atributos: 'inputmode="numeric" maxlength="14" placeholder="000.000.000-00" data-mask="cpf"' })}
              ${campo({ id: "nascimento", rotulo: "Data de nascimento", tipo: "date", colunas: "col-12 col-md-6", dica: "É preciso ter 18 anos ou mais.", atributos: 'min="1900-01-01"' })}
              ${campo({ id: "email", rotulo: "E-mail", tipo: "email", colunas: "col-12 col-md-6", atributos: 'maxlength="120" autocomplete="email" placeholder="voce@exemplo.com"' })}
              ${campo({ id: "telefone", rotulo: "Telefone com DDD", tipo: "tel", colunas: "col-12 col-md-6", atributos: 'inputmode="numeric" maxlength="15" autocomplete="tel" placeholder="(12) 91234-5678" data-mask="telefone"' })}
            </div>
          </fieldset>

          <fieldset>
            <legend>Endereço</legend>
            <div class="grid">
              ${campo({ id: "cep", rotulo: "CEP", colunas: "col-12 col-md-4", atributos: 'inputmode="numeric" maxlength="9" autocomplete="postal-code" placeholder="00000-000" data-mask="cep"' })}
              ${campo({ id: "logradouro", rotulo: "Rua / Avenida", colunas: "col-12 col-md-8", atributos: 'maxlength="120" autocomplete="address-line1"' })}
              ${campo({ id: "numero", rotulo: "Número", colunas: "col-6 col-md-3", atributos: 'maxlength="10"' })}
              ${campo({ id: "complemento", rotulo: "Complemento", colunas: "col-6 col-md-5", obrigatorio: false, atributos: 'maxlength="60" autocomplete="address-line2"' })}
              ${campo({ id: "bairro", rotulo: "Bairro", colunas: "col-12 col-md-4", atributos: 'maxlength="60"' })}
              ${campo({ id: "cidade", rotulo: "Cidade", colunas: "col-12 col-md-8", atributos: 'maxlength="60" autocomplete="address-level2"' })}
              ${campoSelect({ id: "estado", rotulo: "Estado", colunas: "col-12 col-md-4", opcoes: estados })}
            </div>
          </fieldset>

          <fieldset>
            <legend>Como você quer ajudar?</legend>
            <fieldset class="subgrupo">
              <legend>Tipo de apoio *</legend>
              <div class="opcoes">
                <label class="opcao"><input type="radio" name="tipo" value="doador"> Doador</label>
                <label class="opcao"><input type="radio" name="tipo" value="voluntario"> Voluntário</label>
                <label class="opcao"><input type="radio" name="tipo" value="ambos"> Os dois</label>
              </div>
              <p id="tipo-erro" class="erro" aria-live="polite"></p>
            </fieldset>

            <div class="grid mt-4">
              ${campo({ id: "valor", rotulo: "Valor mensal da doação (R$)", tipo: "number", colunas: "col-12 col-md-6", obrigatorio: false, dica: "Entre R$ 10 e R$ 10.000. Obrigatório para doadores.", atributos: 'min="10" max="10000" step="5" placeholder="Ex.: 30"' })}
              ${campoSelect({ id: "disponibilidade", rotulo: "Disponibilidade para voluntariado", colunas: "col-12 col-md-6", obrigatorio: false, dica: "Obrigatório para voluntários.", opcoes: [["semana-manha", "Dias de semana, manhã"], ["semana-tarde", "Dias de semana, tarde"], ["sabado", "Sábados"], ["flexivel", "Horário flexível"]] })}
            </div>

            <fieldset class="subgrupo mt-4">
              <legend>Áreas de interesse (opcional)</legend>
              <div class="opcoes">
                ${areas.map(([valor, texto]) => `<label class="opcao"><input type="checkbox" name="areas" value="${valor}"> ${texto}</label>`).join("")}
              </div>
            </fieldset>

            <div class="campo mt-4">
              <label for="mensagem">Quer nos contar algo?</label>
              <textarea id="mensagem" name="mensagem" rows="4" maxlength="300"></textarea>
              <span class="dica">Até 300 caracteres.</span>
            </div>
          </fieldset>

          <fieldset>
            <legend>Consentimento</legend>
            <label class="opcao">
              <input type="checkbox" id="lgpd" name="lgpd" aria-describedby="lgpd-erro">
              <span>Autorizo o Instituto Raiz Viva a usar meus dados para contato, conforme a LGPD. *</span>
            </label>
            <p id="lgpd-erro" class="erro" aria-live="polite"></p>
          </fieldset>

          <div class="form-actions">
            <button type="submit" class="botao">Enviar cadastro</button>
            <button type="reset" class="botao botao--secundario">Limpar formulário</button>
          </div>
        </form>
      </div>
    </section>`,

  aposRenderizar: (raiz) => iniciarFormulario(raiz),
};

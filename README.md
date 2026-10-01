# Instituto Raiz Viva

Plataforma web de uma ONG fictícia, criada na disciplina de Desenvolvimento Front-end. O site apresenta os projetos sociais da organização, recebe o cadastro de doadores e voluntários e mostra um resumo dos apoiadores cadastrados. É uma **Single Page Application** feita com HTML, CSS e JavaScript puro (módulos ES), sem back-end.

> Organização e dados fictícios, usados apenas para fins acadêmicos.

## Funcionalidades

- **Navegação sem recarregar a página**, com roteador por hash (`#/rota`), menu responsivo (hambúrguer no celular e dropdown no desktop) e página 404.
- **Páginas geradas por templates em JavaScript**: início, projetos sociais, cadastro e lista de apoiadores.
- **Formulário de cadastro** com máscaras (CPF, telefone e CEP), validação por campo, mensagens de erro e bloqueio de CPF duplicado.
- **Persistência no navegador** com `localStorage`: os cadastros e o rascunho do formulário continuam depois de recarregar a página.
- **Gráfico por tipo de apoio** com Chart.js, carregado sob demanda.
- **Componentes de feedback**: alertas, badges, toasts e modal de confirmação.
- **Design system próprio** com variáveis CSS (cores, tipografia e espaçamentos) e grid de 12 colunas com 5 breakpoints.

## Tecnologias

| Área | Uso |
|---|---|
| Marcação | HTML5 semântico |
| Estilo | CSS3 (variáveis, Grid, Flexbox, `@media`) |
| Lógica | JavaScript ES2022, módulos ES (`import`/`export`) |
| Biblioteca | [Chart.js](https://www.chartjs.org) 4.5.1 (licença MIT), incluída em `js/vendor/` |
| Testes | Executor nativo do Node (`node --test`) |

## Estrutura do projeto

```
index.html            redireciona para html/index.html
html/index.html       casca da aplicação (cabeçalho, <main id="app">, rodapé, modal e toasts)
css/                  tokens, base, layout, components, navegacao e spa
imagens/              logotipo e ilustração (SVG, PNG, WebP e JPG)
js/
  main.js             ponto de entrada
  router.js, rotas.js roteador por hash e tabela de rotas
  core/               utilitários de DOM e acesso ao localStorage
  data/               dados e repositório de apoiadores
  modules/            menu, feedback, formulário, validação, máscaras e gráfico
  templates/          componentes reutilizáveis e uma página por arquivo
  vendor/             biblioteca externa (Chart.js)
tests/                testes automatizados das regras de validação e das máscaras
```

## Como executar

**Requisitos:** um navegador atual. Para rodar os testes, Node.js 18 ou superior.

Os módulos ES **não funcionam abrindo o arquivo com duplo clique** (`file://`). Sirva a pasta por HTTP, de uma destas formas:

```bash
# com Python
python3 -m http.server 8000

# ou com Node
npx serve .
```

Depois abra `http://localhost:8000`. No VS Code, a extensão **Live Server** também funciona.

## Como usar

1. Em **Projetos sociais**, veja as iniciativas e como participar.
2. Em **Seja doador ou voluntário**, preencha o cadastro. Os erros aparecem abaixo de cada campo.
3. Em **Apoiadores**, veja os cadastros salvos, o gráfico por tipo de apoio e remova registros.

Os dados ficam apenas no navegador de quem usa. Não há envio para servidor.

## Testes

```bash
npm test
```

Executa os testes das regras de validação (CPF, telefone, CEP, e-mail, maioridade) e das máscaras.

## Manutenção

- **Nova página:** crie um arquivo em `js/templates/paginas/` exportando `{ caminho, titulo, render }` e inclua-o em `js/rotas.js`. Se quiser, adicione o link no menu de `html/index.html`.
- **Novo projeto social:** acrescente um objeto em `js/data/projetos.js`. O cartão é gerado automaticamente.
- **Nova regra de validação:** acrescente uma função em `regras`, em `js/modules/validacao.js`, e um teste em `tests/`.
- **Cores, fontes e espaçamentos:** altere as variáveis em `css/tokens.css`.

## Acessibilidade

O projeto foi auditado contra a **WCAG 2.1 nível AA** (axe-core, contraste, teclado e reflow). Os problemas encontrados foram corrigidos, e o relatório completo, com a metodologia e as limitações, está em [ACESSIBILIDADE.md](ACESSIBILIDADE.md).

## Decisões técnicas

- **Roteamento por hash** em vez da History API, para funcionar no GitHub Pages sem configurar servidor.
- **Templates com Template Literals**, com escape de todo texto dinâmico para evitar injeção de HTML.
- **Um único módulo acessa o `localStorage`** (`js/core/storage.js`), com tratamento de erros.
- **Chart.js embutido e carregado sob demanda**, sem depender de CDN. Se falhar, a página continua funcionando.

## Contribuição

O projeto segue o fluxo **GitFlow** e **commits semânticos**. Veja o guia em [CONTRIBUTING.md](CONTRIBUTING.md).

## Créditos e licenças

- Chart.js: licença MIT (arquivo em `js/vendor/chart.js-LICENSE.md`).
- Ilustrações e logotipo: criados para este projeto.
- Desenvolvido por [@lopestesta-design](https://github.com/lopestesta-design).

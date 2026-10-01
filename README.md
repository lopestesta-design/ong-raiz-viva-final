# Instituto Raiz Viva - SPA

Experiência Prática III (Desenvolvimento Front-end): o site da ONG fictícia transformado em uma **Single Page Application** com JavaScript puro (módulos ES), templates dinâmicos, validação de formulários e armazenamento no `localStorage`.

## Como executar
Os módulos ES (`import`/`export`) **não funcionam abrindo o arquivo com duplo clique** (`file://`). Use um servidor:
- VS Code: extensão **Live Server** > "Go Live", ou
- terminal: `python3 -m http.server 8000` e abra `http://localhost:8000`, ou
- GitHub Pages (Settings > Pages > branch `main`).

Testes automatizados: `npm test` (Node 18+).

## Estrutura
```
index.html              redireciona para html/index.html (útil no GitHub Pages)
html/
  index.html            casca da SPA (cabeçalho, <main id="app">, rodapé, modal e toasts)
css/                    design system e componentes (tokens, base, layout, components, navegacao, spa)
imagens/                logotipo e ilustração (SVG, PNG, WebP, JPG)
js/
  main.js               ponto de entrada: liga os módulos
  router.js             roteador por hash (#/rota), com parâmetro e página 404
  rotas.js              tabela de rotas
  core/                 utilitários (dom.js) e acesso ao localStorage (storage.js)
  data/                 dados (projetos, estados) e repositório de apoiadores
  modules/              menu, feedback (toast e modal), formulário, validação e máscaras
  templates/            componentes reutilizáveis e uma página por arquivo
  vendor/               biblioteca externa embutida: chart.umd.js (Chart.js 4.5.1, licença MIT)
tests/                  testes das regras de validação e máscaras
```

## Rotas
`#/` início | `#/projetos` (e `#/projetos/hortas`) | `#/cadastro` | `#/apoiadores`

## Biblioteca externa
- **Chart.js 4.5.1** (MIT), usada para o gráfico de rosca da página de apoiadores.
- O arquivo fica em `js/vendor/chart.umd.js` (sem CDN), e `js/modules/grafico.js` o carrega **sob demanda**, só quando há dados para mostrar.
- Se a biblioteca falhar, a página continua funcionando: o resumo em texto (badges) não depende dela.

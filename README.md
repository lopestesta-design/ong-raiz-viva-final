# Instituto Raiz Viva

Plataforma web de uma ONG fictícia, criada na disciplina de Desenvolvimento Front-end. O site apresenta os projetos sociais da organização, recebe o cadastro de doadores e voluntários e mostra um resumo dos apoiadores cadastrados. É uma **Single Page Application** feita com HTML, CSS e JavaScript puro (módulos ES), sem back-end.

> Organização e dados fictícios, usados apenas para fins acadêmicos.

**Demonstração:** https://lopestesta-design.github.io/ong-raiz-viva-final/

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
scripts/build.mjs     build de produção (gera a pasta dist/)
.github/workflows/    publicação automática no GitHub Pages
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

## Build e deploy

O site em produção não usa os arquivos-fonte diretamente: o comando `npm run build` gera a pasta `dist/`, que é a que vai ao ar.

```bash
npm install        # uma vez (Node.js 20.9 ou superior)
npm run build      # gera dist/
python3 -m http.server 8000 -d dist   # para conferir o resultado em http://localhost:8000
```

### O que o build faz
- **JavaScript:** junta os 20 módulos em um único arquivo e minifica (esbuild).
- **CSS:** junta os 6 arquivos em um só e minifica.
- **Cache:** os arquivos levam um hash no nome (`main.5035c859.js`), então o navegador baixa de novo só o que mudou.
- **Imagens:** publica só as que o site usa, com o PNG reduzido e o WebP gerado a partir do PNG original.
- **HTML:** aponta para os arquivos novos.

### Resultado (tamanho e, entre parênteses, comprimido com gzip)

| Item | Antes | Depois |
|---|---|---|
| JavaScript | 46,5 KB (19,0 KB) | 28,8 KB (10,0 KB) |
| CSS | 29,3 KB (8,6 KB) | 20,7 KB (4,6 KB) |
| Imagem `horta.png` | 7,9 KB | 1,9 KB |
| Imagem `horta.webp` | 5,8 KB | 5,4 KB |
| Requisições de JS e CSS | 26 | 2 |

Somando o que a página inicial baixa (JavaScript, CSS e imagens, comprimidos), o total cai de cerca de 34 KB para 20 KB, ou seja, aproximadamente 40% menos. O Chart.js (arquivo à parte) só é baixado na página de apoiadores.

### Publicação (deploy)
O deploy é automático. A cada push na branch `main`, o workflow `.github/workflows/deploy.yml`:
1. instala as dependências (`npm ci`);
2. roda os testes (`npm test`);
3. gera o `dist/` (`npm run build`);
4. publica o `dist/` no GitHub Pages.

Para ativar uma vez: no repositório, **Settings > Pages > Source: GitHub Actions**.

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

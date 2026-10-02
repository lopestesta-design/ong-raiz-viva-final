# Changelog

Todas as mudanças relevantes do projeto ficam registradas aqui.
O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [Não lançado]

### Adicionado
- Build de produção com esbuild (`npm run build`): JavaScript e CSS minificados e com hash no nome.
- Otimização de imagens no build (sharp) e publicação só das imagens usadas.
- Publicação automática no GitHub Pages com GitHub Actions, rodando os testes antes.
- Favicon e cor do tema no HTML.

### Alterado
- Peso da página inicial reduzido em cerca de 40% (JavaScript, CSS e imagens comprimidos).

### Corrigido
- Contraste do anel de foco (WCAG 1.4.11): azul-marinho em fundo claro e amarelo em fundo escuro.
- Submenu do menu pode ser dispensado com Esc (WCAG 1.4.13).
- Toasts de erro não somem sozinhos; os demais pausam com mouse ou foco (WCAG 2.2.1).
- Mensagens de erro do formulário anunciadas por leitores de tela (WCAG 4.1.3).
- `autocomplete` nos campos de nascimento e bairro (WCAG 1.3.5).
- Cor da fatia amarela do gráfico com contraste suficiente (WCAG 1.4.11).

### Adicionado
- Relatório de acessibilidade (`ACESSIBILIDADE.md`).
- README, guia de contribuição (`CONTRIBUTING.md`) e este changelog.
- Arquivo `.gitignore`.

## Base (Prática III)

### Adicionado
- Single Page Application com roteador por hash e templates em JavaScript.
- Cadastro de apoiadores com máscaras, validação e persistência no `localStorage`.
- Lista de apoiadores com gráfico (Chart.js) e remoção com confirmação.
- Design system, grid de 12 colunas, menu responsivo, alertas, badges, toasts e modal.
- Testes automatizados das regras de validação e das máscaras.

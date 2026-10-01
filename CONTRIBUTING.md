# Guia de contribuição

Este projeto usa o fluxo **GitFlow** e **commits semânticos**.

## Branches

| Branch | Função |
|---|---|
| `main` | Versão estável, em produção. Só recebe merges de `release/*` e `hotfix/*`. |
| `develop` | Integração. Reúne as funcionalidades prontas para a próxima versão. |
| `feature/<nome>` | Uma funcionalidade ou melhoria. Sai de `develop` e volta para `develop`. |
| `release/<versão>` | Preparação de uma versão (ajustes finais, changelog). Sai de `develop` e vai para `main` e `develop`. |
| `hotfix/<nome>` | Correção urgente em produção. Sai de `main` e vai para `main` e `develop`. |

Exemplos de nomes: `feature/acessibilidade`, `feature/build-otimizacao`, `release/1.0.0`.

## Fluxo de trabalho

1. Atualize o `develop`: `git switch develop && git pull`.
2. Crie a branch: `git switch -c feature/minha-melhoria`.
3. Faça commits pequenos e semânticos.
4. Envie a branch: `git push -u origin feature/minha-melhoria`.
5. Abra um **Pull Request** para `develop`, descreva o que mudou e peça revisão.
6. Depois de aprovado, faça o merge e apague a branch.

## Commits semânticos

Formato: `tipo: descrição curta no imperativo`

| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de erro |
| `docs` | Documentação |
| `style` | Formatação e estilo, sem mudar a lógica |
| `refactor` | Reorganização do código, sem mudar o comportamento |
| `test` | Testes |
| `perf` | Melhoria de desempenho |
| `build` | Build, dependências e empacotamento |
| `chore` | Tarefas de manutenção |

Exemplos:

```
feat: adiciona gráfico por tipo de apoio
fix: cancela rascunho pendente ao enviar o formulário
docs: documenta como adicionar uma nova página
```

## Antes de abrir um Pull Request

- [ ] `npm test` passa.
- [ ] O site abre sem erros no console.
- [ ] As mudanças estão descritas no `CHANGELOG.md`.
- [ ] A descrição do PR explica o que mudou e por quê.

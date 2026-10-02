# Relatório de acessibilidade (WCAG 2.1 nível AA)

Auditoria feita no site publicado a partir deste repositório, nas quatro telas (início, projetos, cadastro e apoiadores), em janela de desktop (1280 px) e de celular (390 px).

## Como foi feito

| Verificação | Ferramenta |
|---|---|
| Regras automáticas WCAG 2.1 A e AA | axe-core 4.13, executado no navegador (Chromium) |
| Contraste de cores | Cálculo da razão de contraste (fórmula da WCAG) em cada combinação de cor |
| Teclado e foco | Navegação por Tab em todas as telas, com leitura do estilo de foco de cada elemento |
| Reflow e zoom | Janela de 320 px (equivale a 400% de zoom) e espaçamento de texto aumentado |
| Estados e mensagens | Teste do formulário com erros, do menu, do modal e das notificações |

## O que foi encontrado e corrigido

O axe-core não apontou violações. Os testes manuais encontraram 6 problemas, cada um corrigido em um commit.

| # | Problema | Critério WCAG | Correção |
|---|---|---|---|
| 1 | Anel de foco amarelo com contraste de 1,6 a 1,8:1 em fundos claros | 1.4.11 Contraste de não texto | Anel azul-marinho em fundo claro (14:1) e amarelo em fundo escuro (7,8:1) |
| 2 | Submenu aberto por mouse não fechava com Esc | 1.4.13 Conteúdo em hover ou foco | Esc dispensa o submenu e devolve o foco ao link principal |
| 3 | Toast de erro sumia sozinho em 4,5 s | 2.2.1 Tempo ajustável | Erros ficam até serem fechados; os demais duram 8 s e pausam com mouse ou foco |
| 4 | Mensagens de erro do formulário não eram anunciadas | 4.1.3 Mensagens de status | Regiões `aria-live="polite"` e toast de erro com `role="alert"` |
| 5 | Fatia amarela do gráfico com 2,25:1 contra o fundo | 1.4.11 Contraste de não texto | Âmbar mais escuro (4,3:1) |
| 6 | Campos de nascimento e bairro sem `autocomplete` | 1.3.5 Finalidade dos campos | `autocomplete="bday"` e `"address-level3"` |

## Resultado depois das correções

- axe-core: 0 violações nas 4 telas, em desktop e celular.
- Anel de foco: de 7,8:1 a 14,3:1 em todas as regiões (cabeçalho, rodapé, submenu, formulário e botões).
- Esc fecha o submenu; erros permanecem na tela; mensagens de erro anunciadas.
- Sem rolagem horizontal em 320 px; sem texto cortado com espaçamento aumentado.

## Já estava conforme

- Idioma da página (`lang="pt-BR"`) e título que muda a cada rota.
- Marcos semânticos (`header`, `nav`, `main`, `footer`) e hierarquia de títulos.
- Link "Ir para o conteúdo principal" e foco movido ao título depois de cada navegação.
- Campos com `label` ligado ao `id`, `fieldset` e `legend` nos grupos, e erros ligados por `aria-describedby`.
- Menu hambúrguer com `aria-expanded` e links ocultos fora da ordem do Tab quando fechado.
- Imagens com `alt` (informativas) ou `alt=""` (decorativas); gráfico com `aria-label` e resumo em texto.
- Respeito a `prefers-reduced-motion`.

## Limitações

- Ferramentas automáticas cobrem só parte da WCAG. O restante depende de avaliação humana.
- **Não foi feito teste com leitor de tela real** (NVDA, JAWS ou VoiceOver). Os atributos ARIA foram verificados por código e por regras do axe, mas a experiência de áudio ainda precisa de teste manual.
- Os testes foram feitos em Chromium. Firefox e Safari não foram verificados.

## Como repetir a auditoria

1. Abra o site no Chrome e rode **Lighthouse > Accessibility** (DevTools, tecla F12).
2. Ou instale a extensão **axe DevTools** e analise cada tela.
3. Teste só com o teclado: Tab, Shift+Tab, Enter, Espaço e Esc. Todo elemento interativo precisa ter foco visível e ser alcançável.

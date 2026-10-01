/* Integração com a biblioteca Chart.js (v4, licença MIT).
   - O arquivo fica em js/vendor/chart.umd.js: não depende de CDN nem de internet.
   - Carregamento sob demanda ("lazy"): só é baixado quando a página de apoiadores
     tem dados para mostrar, então não pesa no carregamento inicial da SPA.
   - A biblioteca é um script clássico que cria o global window.Chart. Ela fica isolada
     neste módulo: o resto do código não toca em Chart. */

let promessaChart = null;

function carregarChart() {
  if (window.Chart) return Promise.resolve(window.Chart);
  promessaChart ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = new URL("../vendor/chart.umd.js", import.meta.url).href;
    script.onload = () => resolve(window.Chart);
    script.onerror = () => { promessaChart = null; reject(new Error("Chart.js não carregou")); };
    document.head.append(script);
  });
  return promessaChart;
}

/* Lê uma cor do design system (variável CSS), para o gráfico seguir a paleta do site. */
const cor = (variavel) => getComputedStyle(document.documentElement).getPropertyValue(variavel).trim();

/* Conta quantos apoiadores existem de cada tipo. */
export function resumirPorTipo(lista) {
  const total = { doador: 0, voluntario: 0, ambos: 0 };
  lista.forEach((apoiador) => { if (apoiador.tipo in total) total[apoiador.tipo] += 1; });
  return total;
}

/* Desenha (ou redesenha) o gráfico de rosca. Se a biblioteca falhar, a página continua
   funcionando: o resumo em texto ao lado do gráfico não depende dela. */
export async function desenharGraficoTipos(canvas, resumo) {
  if (!canvas) return;
  try {
    const Chart = await carregarChart();
    Chart.getChart(canvas)?.destroy();                       // evita gráficos duplicados no mesmo canvas

    Chart.defaults.color = cor("--color-text");
    Chart.defaults.font.family = cor("--font-body");
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: ["Doadores", "Voluntários", "Doador e voluntário"],
        datasets: [{
          data: [resumo.doador, resumo.voluntario, resumo.ambos],
          backgroundColor: [cor("--color-success"), cor("--color-primary"), cor("--chart-amber")],
          borderColor: cor("--color-surface"),
          borderWidth: 3,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: semMovimento ? false : { duration: 600 },
        plugins: { legend: { position: "bottom" } },
      },
    });
  } catch {
    /* sem gráfico: o resumo em texto continua visível */
  }
}

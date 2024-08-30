import { ChartOptions } from "chart.js";

export const bloodPressureChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        maxRotation: 0,
        minRotation: 0,
      },
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 6,
      hoverRadius: 8,
      backgroundColor: "white",
      borderWidth: 2,
    },
  },
};

import { defineStore } from "pinia";
import { colors } from "~/components/graph/utils/colors";

import type { Graph, GraphList } from "~/types/Graphs.dt";

export const useGraphsStore = defineStore("graphs", () => {
  // Liste les types de graphiques avec leurs paramétrages par défaut
  const graphType: Ref<GraphList> = ref({
    bar: {
      id: "bar",
      series: [],
      options: {},
      darkMode: true,
      color: colors(["KDA"]),
      // new graphic.LinearGradient(0, 0, 1, 0, [
      //   {
      //     offset: 0,
      //     color: "rgb(184, 169, 252)",
      //   },
      //   {
      //     offset: 1,
      //     color: "rgb(112, 93, 206)",
      //   },
      // ]),
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: "{b}: {c}%",
      },
      grid: {
        top: "0",
        left: "0",
        right: "15",
        bottom: "0",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        axisLabel: {
          color: "#fff",
          formatter: "{value}%",
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "category",
        // data: serieName,
        axisLabel: {
          color: "#fff",
        },
      },
    },
    line: {
      id: "line",
      series: [],
      options: {
        chart: {
          type: "line",
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "value",
        },
      },
    },
    mixed: {
      id: "mixed",
      darkMode: true,
      series: [],
      options: {
        chart: {
          type: "line",
        },
        color: colors([
          "KD",
          "KDA",
          "Kills",
          "Deaths",
          "Assists",
          "Points",
          "Win",
        ]),
        legend: {
          selected: {
            KD: false,
          },
          textStyle: {
            color: "#fff",
          },
          icon: "roundRect",
        },
        emphasis: {
          selectorLabel: {
            show: true,
          },
        },
        tooltip: {
          trigger: "axis",
          confine: true,
          backgroundColor: "rgba(51, 51, 51, .8)",
          borderColor: "#858585",
          textStyle: {
            color: "white",
          },
          axisPointer: {
            type: "shadow",
            snap: true,
            label: {
              show: true,
              backgroundColor: "#333",
            },
          },
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#fff",
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#4A4A4A",
              },
            },
          },
          {
            type: "value",
            axisLabel: {
              color: "#fff",
            },
            splitLine: {
              show: false,
            },
          },
          {
            type: "value",
            axisLabel: {
              color: "#fff",
            },
            show: false,
            min: 0,
            max: 1,
            splitLine: {
              show: false,
            },
          },
        ],
        xAxis: {
          type: "category",
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: "#fff",
            rotate: 45,
          },
        },
        grid: {
          top: "20",
          left: "0",
          right: "0",
          bottom: "20",
          containLabel: true,
        },
        series: [],
      },
    },
  });
  // Liste les graphiques, leurs paramètres et leurs données
  const graphs: Ref<GraphList> = ref({});

  // Impacte un graphique
  const setGraph = async (
    graphId: Graph["id"],
    series: Graph["series"],
    options: Graph["options"] = {}
  ): Promise<void> => {
    graphs.value[graphId] = {
      ...graphs.value[graphId],
      id: graphId,
      series: series,
      options: options,
    };
  };

  return { graphType, graphs, setGraph };
});

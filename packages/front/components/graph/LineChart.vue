<template>
  <div @:mouseleave="handleMouseOut">
    <VChart class="chart-container w-full h-full" :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import { LineChart } from "echarts/charts";
import type { BarSeriesOption } from "echarts/charts";
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { use } from "echarts/core";
import type { ComposeOption } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import _ from "lodash";
import VChart from "vue-echarts";

import { useGraphsStore } from "@/stores/graphs.store";
import {
  GridComponent,
  type LegendComponentOption,
  type TitleComponentOption,
  type TooltipComponentOption,
} from "echarts/components";

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
]);

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | BarSeriesOption
>;

const props = defineProps({
  // series: Array as PropType<BarSeriesOption[]>,
  series: Object,
  graphId: {
    type: String,
    required: true,
  },
  dataType: String,
  subTitle: String,
});
const { series, graphId, dataType, subTitle } = toRefs(props);
const graphsStore = useGraphsStore();

const serieName: Ref<Array<string>> = ref([]);
const serieKdaData: Ref<Array<number>> = ref([]);
const serieKillsData: Ref<Array<number>> = ref([]);
const serieDeathsData: Ref<Array<number>> = ref([]);
const serieAssistsData: Ref<Array<number>> = ref([]);
const serieDate: Ref<Array<string>> = ref([]);

// watch(series, (series.value) => {
//   console.log("COMPUTING SERIE");

//   series.value.map((serie) => {
//     console.log("Serie: ", serie);

//     serieName.value.push(serie.name);
//     serieData.value.push(serie.value);
//   });
//   console.log("SerieName: ", serieName);
//   console.log("SerieData: ", serieData);
// });

const option: Ref<EChartsOption> = ref({});

const handleMouseOut = () => {
  console.log("Mouse Out");
  console.log(serieKillsData.value);

  graphsStore.moveGraph(
    "kdaGraph",
    {
      kills: Math.round(_.mean(serieKillsData.value) * 100) / 100,
      deaths: Math.round(_.mean(serieDeathsData.value) * 100) / 100,
      assists: Math.round(_.mean(serieAssistsData.value) * 100) / 100,
    },
    {
      title: {
        text: "Impact\nmoyen",
      },
    }
  );
};

const colors = (colorSeries, colorType) => {
  const availableSeries = {
    kda: { light: "rgb(184, 169, 252)", dark: "rgb(112, 93, 206)" },
    kills: { light: "rgb(171, 245, 207)", dark: "rgb(79, 255, 164)" },
    deaths: { light: "rgb(245, 154, 184)", dark: "rgb(237, 62, 120)" },
    assists: { light: "rgb(252, 223, 154)", dark: "rgb(247, 184, 36)" },
  };
  if (["light", "dark"].includes(colorType)) {
    // console.log("COLOR TYPE", colorSeries[0], colorType);
    return availableSeries[colorSeries[0]][colorType];
  }
  const colors = [];
  colorSeries.map((serie) => {
    colors.push({
      type: "linear",
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: availableSeries[serie].light,
        },
        {
          offset: 1,
          color: availableSeries[serie].dark,
        },
      ],
      global: false,
    });
  });
  return colors;
};

watchEffect(() => {
  if (series.value) {
    // console.log("COMPUTING SERIE");
    serieName.value = [];
    serieKdaData.value = [];
    serieKillsData.value = [];
    serieDeathsData.value = [];
    serieAssistsData.value = [];
    serieDate.value = [];
    series.value.kda.map((serie, index) => {
      // console.log("Serie: ", serie);
      // console.log("Index: ", index);

      serieName.value.push(serie.name);
      serieKdaData.value.push(serie.value);
      serieDate.value.push(serie.date);
      serieKillsData.value.push(series.value.kills[index].value);
      serieDeathsData.value.push(series.value.deaths[index].value);
      serieAssistsData.value.push(series.value.assists[index].value);
    });

    // console.log("SerieName: ", serieName.value);
    // console.log("SerieData: ", serieData.value);
    option.value = {
      darkMode: true,
      title: {
        id: graphId?.value,
      },
      // color: ["#6f5dce"],
      color: colors(["kda", "kills", "deaths", "assists"]),
      legend: {
        data: ["KDA", "Kills", "Deaths", "Assists"],
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
        formatter: (params) => {
          // console.log("PARAMS", params);
          // console.log(
          //   "datas",
          //   serieKdaData.value[params[0].dataIndex],
          //   serieKillsData.value[params[0].dataIndex],
          //   serieDeathsData.value[params[0].dataIndex],
          //   serieAssistsData.value[params[0].dataIndex]
          // );

          const map: string = params[0].axisValue.split("|")[0];
          const date = params[0].axisValue.split("|")[1];
          const time = params[0].axisValue.split("|")[2];
          const kda = serieKdaData.value[params[0].dataIndex]; //params[0].data;
          // console.log(
          //   "ACTION update KDA",
          //   kda,
          //   params[1].data,
          //   params[2].data,
          //   params[3].data
          // );
          graphsStore.moveGraph("kdaGraph", {
            kills: serieKillsData.value[params[0].dataIndex],
            deaths: serieDeathsData.value[params[0].dataIndex],
            assists: serieAssistsData.value[params[0].dataIndex],
          });
          // emit("updateKda", {
          //   kills: serieKillsData.value[params[0].dataIndex],
          //   deaths: serieDeathsData.value[params[0].dataIndex],
          //   assists: serieAssistsData.value[params[0].dataIndex],
          // });

          return drawTooltip({
            date: date,
            time: time,
            map: map,
            kda: {
              kda: kda,
              kills: serieKillsData.value[params[0].dataIndex],
              deaths: serieDeathsData.value[params[0].dataIndex],
              assists: serieAssistsData.value[params[0].dataIndex],
            },
          });
        },
      },
      //   legend: {},
      grid: {
        top: "20",
        left: "0",
        right: "0",
        bottom: "0",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        splitLine: {
          show: false,
        },
        data: serieName.value,
        axisLabel: {
          color: "#fff",
          rotate: 45,
          formatter: (params) => {
            return params.split("|")[0];
          },
        },
      },
      yAxis: {
        type: "value",
        // boundaryGap: [0, '100%'],
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
      series: [
        {
          name: "KDA",
          type: "line",
          showSymbol: false,
          data: serieKdaData.value,
        },
        {
          name: "Kills",
          type: "line",
          showSymbol: false,
          data: serieKillsData.value,
        },
        {
          name: "Deaths",
          type: "line",
          showSymbol: false,
          data: serieDeathsData.value,
        },
        {
          name: "Assists",
          type: "line",
          showSymbol: false,
          data: serieAssistsData.value,
        },
      ],
    };
  }
});

const drawTooltip = (datas) => {
  // console.log("DRAW TOOLTIP");
  let tooltip = `
    <span
      style='
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        font-size: .8em;
        background-color: rgb(184, 169, 252);
        width: 100%;
        padding: 4px;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px 4px 0 0;
        color: white;
      '>
      <span>
        ${datas.date}
      </span>
      <span>
        ${datas.time}
      </span>
    </span>
    <br/>
    <span
      style='
        font-weight: bold;
        font-size: 1.2
      '>
      ${datas.map}
    </span>: ${datas.kda.kda}
    <span
      style='
        font-size: .7em;
        font-style: italic;
      '>
      KDA
    </span>
    <br/>`;
  Object.entries(datas.kda).map(([key, value]) => {
    tooltip += `
          <span>
            <svg width="20" height="20" style="display: inline-block;">
              <defs>
                <linearGradient id="grad-${key}" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stop-color="${colors([key], "light")}" />
                  <stop offset="100%" stop-color="${colors([key], "dark")}" />
                </linearGradient>
              </defs>
              <circle cx="8" cy="8" r="5" fill="url(#grad-${key})"
              />
            </svg>
          </span>
          <span>
            <b>${value}</b> ${key}
          </span>
          <br/>`;
  });
  return tooltip;
};

// onMounted(() => {
//   console.log("LINE GRAPH MOUNTED");
//   graphsStore.moveGraph(
//     "kdaGraph",
//     {
//       kills: Math.round(_.mean(serieKillsData.value) * 100) / 100,
//       deaths: Math.round(_.mean(serieDeathsData.value) * 100) / 100,
//       assists: Math.round(_.mean(serieAssistsData.value) * 100) / 100,
//     },
//     {
//       title: {
//         text: "Impact\nmoyen",
//       },
//     }
//   );
// });
</script>
<style scoped>
.chart-container {
  overflow: visible;
  height: 100%;
}
</style>

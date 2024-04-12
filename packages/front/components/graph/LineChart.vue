<template>
  <VChart class="chart-container w-full h-full" :option="option" autoresize />
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
import VChart from "vue-echarts";

import { graphic } from "echarts";
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
  dataType: String,
  subTitle: String,
});
const { series, dataType, subTitle } = toRefs(props);
const emit = defineEmits(["updateKda"]);
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
      //   title: {
      //     text: "Taux de victoire par Map",
      //     color: "#fff",
      //   },
      //   color: ["#6f5dce"],
      color: [
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgb(184, 169, 252)",
            },
            {
              offset: 1,
              color: "rgb(112, 93, 206)",
            },
          ],
          global: false,
        },
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgb(171, 245, 207)",
            },
            {
              offset: 1,
              color: "rgb(79, 255, 164)",
            },
          ],
          global: false,
        },
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgb(245, 154, 184)",
            },
            {
              offset: 1,
              color: "rgb(237, 62, 120)",
            },
          ],
          global: false,
        },
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgb(252, 223, 154)",
            },
            {
              offset: 1,
              color: "rgb(247, 184, 36)",
            },
          ],
          global: false,
        },
      ],
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
          const map: string = params[0].axisValue.split("|")[0];
          const date = params[0].axisValue.split("|")[1];
          const time = params[0].axisValue.split("|")[2];
          const kda = params[0].data;
          console.log(
            "ACTION update KDA",
            kda,
            params[1].data,
            params[2].data,
            params[3].data
          );
          emit("updateKda", {
            kills: params[1].data,
            deaths: params[2].data,
            assists: params[3].data,
          });

          return `<span
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
                      ${date}
                    </span>
                    <span>
                      ${time}
                    </span>
                  </span>
                  <br/>
                  <span
                    style='
                      font-weight: bold;
                      font-size: 1.2
                    '>
                    ${map}
                  </span>: ${kda} 
                  <span
                    style='
                      font-size: .7em;
                      font-style: italic;
                    '>
                    KDA
                  </span>
                  <br/>
                  <span>
                    ${params[1].marker}
                  </span>
                  <span>
                    <b>${params[1].data}</b> ${params[1].seriesName}
                  </span>
                  <br/>
                  <span>
                    ${params[2].marker}
                  </span>
                  <span>
                    <b>${params[2].data}</b> ${params[2].seriesName}
                  </span>
                  <br/>
                  <span>
                    ${params[3].marker}
                  </span>
                  <span>
                    <b>${params[3].data}</b> ${params[3].seriesName}
                  </span>`;
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
</script>
<style scoped>
.chart-container {
  overflow: visible;
  height: 100%;
}
</style>

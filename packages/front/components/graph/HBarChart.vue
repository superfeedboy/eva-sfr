<template>
  <VChart class="chart-container w-full h-full" :option="option" autoresize />
</template>

<script setup lang="ts">
import { BarChart } from "echarts/charts";
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
  BarChart,
  CanvasRenderer,
]);

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | BarSeriesOption
>;

const props = defineProps({
  series: Array as PropType<BarSeriesOption[]>,
  dataType: String,
  subTitle: String,
});
const { series, dataType, subTitle } = toRefs(props);
const serieName: Ref<Array<string>> = ref([]);
const serieData: Ref<Array<number>> = ref([]);

watchEffect(() => {
  // console.log("COMPUTING SERIE");
  if (series.value) {
    serieName.value = [];
    serieData.value = [];
    series.value.map((serie) => {
      // console.log("Serie: ", serie);

      serieName.value.push(serie.name);
      serieData.value.push(serie.value);
    });
    // series.value.map((serie) => {
    //   // console.log("Serie: ", serie);

    //   serieName.value.push(serie.name);
    //   serieData.value.push(serie.value);
    // });
    // console.log("SerieName: ", serieName);
    // console.log("SerieData: ", serieData);
  }
});

const option: Ref<EChartsOption> = ref({
  darkMode: true,
  //   title: {
  //     text: "Taux de victoire par Map",
  //     color: "#fff",
  //   },
  //   color: ["#6f5dce"],
  color: new graphic.LinearGradient(0, 0, 1, 0, [
    {
      offset: 0,
      color: "rgb(184, 169, 252)",
    },
    {
      offset: 1,
      color: "rgb(112, 93, 206)",
    },
  ]),
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: "{b}: {c}%",
  },
  //   legend: {},
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
    data: serieName,
    axisLabel: {
      color: "#fff",
    },
  },
  series: [
    {
      stacking: "normal",
      shadow: true,
      itemStyle: {
        borderRadius: [0, 20, 20, 0],
      },
      name: dataType.value,
      type: "bar",
      data: serieData,
      colorBy: "series",
    },
  ],
});
</script>
<style scoped>
.chart-container {
  overflow: visible;
  height: 200px;
}
</style>

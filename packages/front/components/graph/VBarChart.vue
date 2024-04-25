<template>
  <VChart
    class="chart-container w-full h-full border-2"
    :option="options"
    autoresize
  />
</template>

<script setup lang="ts">
import { useGraphsStore } from "~/stores/graphs.store";
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
  series: {
    type: Array as PropType<BarSeriesOption[]>,
    required: true,
  },
  graphOptions: {
    type: Object as () => EChartsOption | object,
    required: false,
  },
  graphId: {
    type: String,
    required: true,
  },
  dataType: String,
  subTitle: String,
});
const { series, dataType, subTitle } = toRefs(props);
const options: Ref<EChartsOption> = ref({});
const serieName: Ref<Array<string>> = ref([]);
const serieData: Ref<Array<number>> = ref([]);
const graphStore = useGraphsStore();

onMounted(() => {
  if (graphStore.graphType.bar.options) {
    console.log("newOptions!!!");
    options.value = graphStore.graphType.mixed.options as EChartsOption;
    console.log("GRAPH Std Options: ", options.value);
    // console.log("GRAPH Options: ", graphOptions.value);
  }
  watch(
    () => series.value,
    (newSeries) => {
      if (newSeries) {
        console.log("New serie for V Bars;", newSeries);

        serieName.value = [];
        serieData.value = [];
        newSeries.map((serie) => {
          serieName.value.push(serie.name);
          serieData.value.push(serie.value);
        });
      }
    }
  );
});
// watchEffect(() => {
//   // console.log("COMPUTING SERIE");
//   if (series.value) {
//     console.log("SERIES: ", series.value);

//     serieName.value = [];
//     serieData.value = [];
//     // series.value.map((serie) => {
//     //   // console.log("Serie: ", serie);

//     //   serieName.value.push(serie.name);
//     //   serieData.value.push(serie.value);
//     // });
//     // series.value.map((serie) => {
//     //   // console.log("Serie: ", serie);

//     //   serieName.value.push(serie.name);
//     //   serieData.value.push(serie.value);
//     // });
//     // console.log("SerieName: ", serieName);
//     // console.log("SerieData: ", serieData);
//   }
// });

// const option: Ref<EChartsOption> = ref({
//   darkMode: true,
//   //   title: {
//   //     text: "Taux de victoire par Map",
//   //     color: "#fff",
//   //   },
//   //   color: ["#6f5dce"],
//   color: new graphic.LinearGradient(0, 0, 1, 0, [
//     {
//       offset: 0,
//       color: "rgb(184, 169, 252)",
//     },
//     {
//       offset: 1,
//       color: "rgb(112, 93, 206)",
//     },
//   ]),
//   tooltip: {
//     trigger: "axis",
//     axisPointer: {
//       type: "shadow",
//     },
//     formatter: "{b}: {c}%",
//   },
//   //   legend: {},
//   grid: {
//     top: "0",
//     left: "0",
//     right: "15",
//     bottom: "0",
//     containLabel: true,
//   },
//   xAxis: {
//     type: "value",
//     axisLabel: {
//       color: "#fff",
//       formatter: "{value}%",
//     },
//     splitLine: {
//       show: false,
//     },
//   },
//   yAxis: {
//     type: "category",
//     data: serieName,
//     axisLabel: {
//       color: "#fff",
//     },
//   },
//   series: [
//     {
//       stacking: "normal",
//       shadow: true,
//       itemStyle: {
//         borderRadius: [0, 20, 20, 0],
//       },
//       name: dataType.value,
//       type: "bar",
//       data: serieData,
//       colorBy: "series",
//     },
//   ],
// });
</script>
<style scoped>
.chart-container {
  overflow: visible;
  height: 200px;
}
</style>

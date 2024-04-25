<template>
  <!-- <div @:mouseleave="handleMouseOut"> -->
  <div
    v-if="isLoading"
    class="h-full w-full bg-slate-300/50 rounded-lg animate-pulse shadow-xl"
  >
    <!-- <LoadingPage :logo="true" info="Chargement du graphique" /> -->
  </div>
  <VChart
    v-else
    class="chart-container w-full h-full"
    :option="options"
    autoresize
  />
  <!-- </div> -->
</template>

<script setup lang="ts">
import { merge } from "lodash";
import { LineChart, BarChart } from "echarts/charts";
import type { LineSeriesOption, BarSeriesOption } from "echarts/charts";
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { use } from "echarts/core";
import type { ComposeOption } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";
import { useGraphsStore } from "~/stores/graphs.store";

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
  BarChart,
  CanvasRenderer,
]);

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | LineSeriesOption
  | BarSeriesOption
>;

const props = defineProps({
  series: {
    type: Object,
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
const { series, graphOptions, graphId, dataType, subTitle } = toRefs(props);
const options: Ref<EChartsOption> = ref({});
const isLoading = ref(true);
const graphStore = useGraphsStore();

onMounted(() => {
  if (graphStore.graphType.mixed.options) {
    console.log("newOptions!!!");
    options.value = graphStore.graphType.mixed.options as EChartsOption;
    console.log("GRAPH Std Options: ", options.value);
    // console.log("GRAPH Options: ", graphOptions.value);
  }
  watch(
    () => series.value,
    (newSeries) => {
      if (options.value && newSeries) {
        console.log(
          "Théoriquement, le graph est OK: ",
          options.value,
          graphOptions?.value,
          series.value
        );
        options.value = {
          ...merge({}, options.value, graphOptions?.value),
          series: newSeries,
        };
        isLoading.value = false;
      }
    }
  );
});
</script>
<style scoped>
.chart-container {
  overflow: visible;
  height: 100%;
}
</style>

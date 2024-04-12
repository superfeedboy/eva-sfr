<template>
  <VChart class="chart-container w-full h-full" :option="option" autoresize />
</template>

<script setup lang="ts">
import { PieChart } from "echarts/charts";
import type { PieSeriesOption } from "echarts/charts";
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
  GridComponent,
  PieChart,
  CanvasRenderer,
]);

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>;

const props = defineProps({
  series: Array as PropType<PieSeriesOption[]>,
  dataType: String,
  subTitle: String,
});
const { series, dataType, subTitle } = toRefs(props);

const option: Ref<EChartsOption> = ref({
  darkMode: true,
  title: {
    text: "Répartition\n des maps",
    // subtext: "Répartitions",
    left: "center",
    top: "center",
    overflow: "break",
    textStyle: {
      fontSize: 15,
      color: "#fff",
    },
  },
  tooltip: {
    trigger: "item",
    formatter: "<b>{b}</b>: {c} ({d}%)",
  },
  //   grid: {
  //     top: 0,
  //     bottom: 0,
  //     left: 0,
  //     right: 0,
  //   },
  series: [
    {
      name: dataType.value,
      type: "pie",
      radius: ["50%", "80%"],
      avoidLabelOverlap: false,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
        label: {
          show: true,
          fontSize: 20,
          overflow: "break",
        },
      },
      labelLine: {
        show: true,
        length: 10,
        length2: 10,
      },
      data: series,
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

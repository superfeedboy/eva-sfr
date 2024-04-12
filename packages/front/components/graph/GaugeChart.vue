<template>
  <VChart class="chart-container w-full h-full" :option="option" autoresize />
</template>

<script setup lang="ts">
import { PieChart } from "echarts/charts";
import type { GaugeSeriesOption } from "echarts/charts";
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
  | GaugeSeriesOption
>;

const props = defineProps({
  series: Object, // as PropType<GaugeSeriesOption[]>,
  dataType: String,
  subTitle: String,
});
const { series, dataType, subTitle } = toRefs(props);
const gaugeDatas: Ref<PropType<GaugeSeriesOption[]>> = ref([]);

watchEffect(() => {
  if (series.value) {
    let index = 0;
    const offsetsTitle = ["-100%", "0%", "100%"];
    const offsetsDatas = ["-100%", "0%", "100%"];
    gaugeDatas.value = Object.entries(series.value).map(([key, value]) => {
      const gaugeData = {
        value: value,
        name: key,
        title: {
          color: "white",
          //   offsetCenter: ["0%", offsetsTitle[index]],
          offsetCenter: [offsetsTitle[index], "25%"],
        },
        detail: {
          valueAnimation: true,
          //   offsetCenter: ["0%", offsetsDatas[index]],
          offsetCenter: [offsetsDatas[index], "50%"],
        },
      };
      index++;
      return gaugeData;
    });
  }
});

const option: Ref<EChartsOption> = ref({
  darkMode: true,
  //   radius: "100%",
  title: {
    text: "Impact",
    left: "center",
    top: "center",
    overflow: "break",
    textStyle: {
      fontSize: 10,
      color: "#fff",
    },
  },
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
  series: [
    {
      type: "gauge",
      startAngle: 180,
      endAngle: 0,
      center: ["50%", "60%"],
      radius: "110%",
      min: 0,
      max: 20,
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: true,
        itemStyle: {
          borderWidth: 1,
          borderColor: "#1D1D1D",
        },
      },
      axisLine: {
        lineStyle: {
          width: 30,
          color: [[1, "transparent"]],
        },
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        distance: 50,
      },
      data: gaugeDatas,
      title: {
        fontSize: 14,
      },
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
      detail: {
        width: 50,
        height: 14,
        fontSize: 14,
        color: "white",
        borderColor: "inherit",
        borderRadius: 20,
        borderWidth: 1,
        padding: [0, 0],
        formatter: "{value}",
      },
    },
  ],
});
</script>
<style scoped>
.chart-container {
  overflow: visible;
  height: 100%;
  /* width: 100%; */
}
</style>

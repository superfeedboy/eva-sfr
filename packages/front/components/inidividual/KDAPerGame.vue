<template>
  <GraphLineChart
    :series="series"
    :graphOptions="options"
    graphId="fullKdaGraph"
    @updateKda="handleUpdateKda"
    dataType="Score"
    class="row-span-2"
  />
</template>

<script setup lang="ts">
import { useGraphsStore } from "~/stores/graphs.store";
import { dataCompute } from "../graph/utils/dataCompute";
import { drawTooltip, getTooltipValue } from "../graph/utils/customTooltip";

import type { Graph } from "~/types/Graphs.dt";

const series: Ref<Graph["series"]> = ref({});
const options: Ref<Graph["options"]> = ref({});
const graphStore = useGraphsStore();

onMounted(() => {
  watch(
    () => graphStore.graphs.individualKDAPerGame,
    (newDatas: Graph) => {
      if (newDatas) {
        series.value = newDatas.series;
        options.value = {
          ...options.value,
          xAxis: {
            data:
              Array.isArray(newDatas.series) &&
              dataCompute.formatXAxis(newDatas.series[0].data),
            axisLabel: {
              formatter: (params: string) => {
                return params.split(",")[0];
              },
            },
          },
          tooltip: {
            formatter: (params: Array<any>) => {
              const map: string = params[0].axisValue.split(",")[0];
              const date = params[0].axisValue.split(",")[1];
              const time = params[0].axisValue.split(",")[2];

              return drawTooltip({
                date: date,
                time: time,
                map: map,
                kda: {
                  kd: getTooltipValue(newDatas, "KD", params[0].dataIndex),
                  kda: getTooltipValue(newDatas, "KDA", params[0].dataIndex),
                  kills: getTooltipValue(
                    newDatas,
                    "Kills",
                    params[0].dataIndex
                  ),
                  deaths: getTooltipValue(
                    newDatas,
                    "Deaths",
                    params[0].dataIndex
                  ),
                  assists: getTooltipValue(
                    newDatas,
                    "Assists",
                    params[0].dataIndex
                  ),
                  points: getTooltipValue(
                    newDatas,
                    "Points",
                    params[0].dataIndex
                  ),
                  win: getTooltipValue(newDatas, "Win", params[0].dataIndex),
                },
              });
            },
          },
          dataZoom: [
            {
              type: "slider",
              textStyle: {
                color: "#fff",
              },
              fillerColor: "rgba(112, 93, 206, .2)",
              // top: 15,
              startValue: 0,
              endValue: 10,
            },
          ],
        };
      }
    }
  );
});

const handleUpdateKda = () => {
  console.log("handleUpdateKda");
};
</script>

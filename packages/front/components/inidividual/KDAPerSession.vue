<template>
  <GraphVBarChart
    :series="series"
    :graphOptions="options"
    graphId="fullKdaGraph"
    dataType="Score"
    class="row-span-2"
  />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useGraphsStore } from "~/stores/graphs.store";

import type { Graph } from "~/types/Graphs.dt";

const series: Ref<Graph["series"]> = ref({});
const options: Ref<Graph["options"]> = ref({});
const graphStore = useGraphsStore();

onMounted(() => {
  watch(
    () => graphStore.graphs.individualKDAPerSession,
    (newDatas: Graph) => {
      console.log("KDA Per Session: ", newDatas);
    }
  );
});

// const kdaPerGame = ref([]); // replace with your data source

// const sessions = computed(() => {
//   const sessions = kdaPerGame.value.reduce((acc, game) => {
//     const date = game.date.split("T")[0]; // assuming game.date is a ISO string
//     if (!acc[date]) {
//       acc[date] = { kills: 0, deaths: 0, assists: 0, games: 0 };
//     }
//     acc[date].kills += game.kills;
//     acc[date].deaths += game.deaths;
//     acc[date].assists += game.assists;
//     acc[date].games += 1;
//     return acc;
//   }, {});

//   // calculate averages
//   for (const date in sessions) {
//     sessions[date].kills /= sessions[date].games;
//     sessions[date].deaths /= sessions[date].games;
//     sessions[date].assists /= sessions[date].games;
//   }

//   return sessions;
// });

// const handleKdaGauge = (title, data) => {
//   // ...
// };
</script>

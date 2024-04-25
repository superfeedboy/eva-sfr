<template>
  <h1 class="text-xl bold">{{ playerDatas.pseudo }}</h1>
  <div class="grid grid-cols-1 xl:grid-cols-6 gap-y-4 xl:gap-4">
    <!-- grid-flow-dense auto-rows-auto grid-rows-4 -->
    <div
      class="w-full h-28 row-span-1 col-span-6 grid grid-cols-5 grid-flow-dense grid-row-subgrid gap-8 p-4"
    >
      <GraphDataTile title="Games" :data="totalGames" />
      <GraphDataTile title="Victoires" :data="totalWins" />
      <GraphDataTile title="Win Rate" :data="`${globalWinRate}%`" />
      <GraphDataTile
        title="KDA moyen"
        :data="
          Math.round(
            ((totalKills + totalAssists) /
              (totalDeaths === 0 ? 1 : totalDeaths)) *
              100
          ) / 100
        "
      />
      <GraphDataTile title="Points moyens" :data="totalPoints" />
    </div>
    <div class="row-span-2 col-span-4 h-full rounded">
      <div class="h-full grid grid-rows-3 grid-flow-col gap-4">
        <InidividualKDAPerGame />
        <div class="relative grid grid-cols-6">
          <!-- <div class="absolute top-0 left-0 flex flex-col gap-3 z-10">
            <span class="absolute text-sm -top-6">{{ gaugeSpan }}</span>
            <Icon
              name="fluent-mdl2:total"
              class="flex text-white hover:cursor-pointer"
              @click="
                handleKdaGauge('Total', {
                  kills: totalKills,
                  deaths: totalDeaths,
                  assists: totalAssists,
                })
              "
            />
            <Icon
              name="icon-park-outline:average"
              class="flex text-white hover:cursor-pointer"
              @click="
                handleKdaGauge('Moyenne', {
                  kills: totalKills / kdaPerGame.length,
                  deaths: totalDeaths / kdaPerGame.length,
                  assists: totalAssists / kdaPerGame.length,
                })
              "
            />
          </div> -->
          <GraphGaugeChart
            :series="{
              kills: totalKills,
              deaths: totalDeaths,
              assists: totalAssists,
            }"
            graphId="kdaGraph"
            dataType="KDA"
            class="col-span-2 row-span-1"
          />
          <InidividualKDAPerSession />
          <!-- <GraphGaugeChart
            :series="{
              kills: totalKills,
              deaths: totalDeaths,
              assists: totalAssists,
            }"
            graphId="kdaGraph"
            dataType="KDA"
            class="col-span-2 row-span-1"
          />
          <GraphGaugeChart
            :series="{
              kills: totalKills,
              deaths: totalDeaths,
              assists: totalAssists,
            }"
            graphId="kdaGraph"
            dataType="KDA"
            class="col-span-2 row-span-1"
          /> -->
        </div>
      </div>
    </div>
    <div
      class="row-span-2 col-span-2 grid lg:grid-flow-col grid-flow-row lg:grid-cols-6 xl:grid-cols-1 xl:grid-flow-row gap-2 xl:gap-0 xl:gap-y-4 h-auto"
    >
      <!-- w-96 -->
      <GraphPieChart
        :series="mapsSeries"
        graphId="mapsDispatchGraph"
        dataType="Map"
        class="h-full rounded lg:col-span-2"
      />
      <GraphHBarChart
        :series="mapWinRate"
        graphId="mapWRGraph"
        dataType="WinRate"
        class="h-full rounded lg:col-span-4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { dataCompute } from "./graph/utils/dataCompute";
import { useDataStore } from "~/stores/datas.store";
import { useGraphsStore } from "~/stores/graphs.store";

import type { Player } from "~/types/DatasSchemes.dt";

const dataStore = useDataStore();
const graphStore = useGraphsStore();
console.log(dataStore.datas.playerDatas);

const playerDatas: Ref<Player> = ref({} as Player);
const mapsSeries: Ref<Array<object>> = ref([]);
const mapWinRate: Ref<Array<object>> = ref([]);
const kdaDatas: Ref<Array<object>> = ref([]);
const kdaPerGame: Ref<Array<number>> = ref([]);
const killsPerGame: Ref<Array<number>> = ref([]);
const deathsPerGame: Ref<Array<number>> = ref([]);
const assistsPerGame: Ref<Array<number>> = ref([]);
const totalGames: Ref<number> = ref(0);
const totalWins: Ref<number> = ref(0);
const globalWinRate: Ref<number> = ref(0);
const totalKills: Ref<number> = ref(0);
const totalDeaths: Ref<number> = ref(0);
const totalAssists: Ref<number> = ref(0);
const totalPoints: Ref<number> = ref(0);
const gaugeSpan: Ref<string> = ref("");

watch(
  () => dataStore.datas.playerDatas,
  (newPlayerDatas) => {
    playerDatas.value = newPlayerDatas.player;
    console.log("PlayerDatas: ", newPlayerDatas);
    graphStore.setGraph(
      "individualKDAPerGame",
      dataCompute.individualKDAPerGame(playerDatas.value.scores),
      { xAxis: { data: kdaDatas.value.map((item) => item.name) } }
    );
    // Appel à dataCompute pour déterminer le winrate global
    totalWins.value = dataCompute.totalWins(playerDatas.value.scores);
    // globalWinRate.value = dataCompute.globalWinRate(
    //   totalWins.value,
    //   totalGames.value
    // );
  }
);

// watchEffect(() => {
//   // console.log("New Player: ", newPlayer);
//   // console.log("Old Player: ", oldPlayer);
//   if (player.value) {
//     // console.log("Player: ", player.value);
//     mapWinRate.value = [];
//     kdaDatas.value = [];
//     kdaPerGame.value = [];
//   }
// });

console.log("PlayerDatas: ", playerDatas.value);

watch(playerDatas, (newPlayerDatas) => {
  totalGames.value = newPlayerDatas.scores.length;
  mapsSeries.value.splice(0, mapsSeries.value.length);
  mapWinRate.value = [];
  kdaDatas.value.splice(0, kdaDatas.value.length);
  kdaPerGame.value.splice(0, kdaPerGame.value.length);
  killsPerGame.value = [];
  deathsPerGame.value = [];
  assistsPerGame.value = [];
  totalKills.value = 0;
  totalDeaths.value = 0;
  totalAssists.value = 0;
  if (!newPlayerDatas) {
    mapsSeries.value = [];
    return;
  }
  globalWinRate.value = dataCompute.globalWinRate(
    totalWins.value,
    totalGames.value
  );
  totalPoints.value = dataCompute.totalPoints(newPlayerDatas.scores);

  const mapCounts = newPlayerDatas.scores.reduce((counts, data) => {
    // console.log("Counts: ", counts);
    // console.log("Data: ", data);

    const mapName = data.game.map; // Remplacez 'map' par le nom de la propriété qui contient le nom de la carte
    if (!counts[mapName]) {
      counts[mapName] = 0;
    }
    counts[mapName]++;
    return counts;
  }, {});

  const mapStats = newPlayerDatas.scores.reduce((stats, score) => {
    const mapName = score.game.map;
    if (!stats[mapName]) {
      stats[mapName] = { totalGames: 0, wins: 0 };
    }
    stats[mapName].totalGames++;
    if (score.game.win) {
      stats[mapName].wins++;
    }
    return stats;
  }, {});

  mapsSeries.value = Object.entries(mapCounts).map(([name, value]) => ({
    name,
    value,
  }));
  mapWinRate.value = Object.entries(mapStats)
    .map(([name, { totalGames, wins }]) => ({
      name,
      value:
        Math.round((totalGames > 0 ? (wins / totalGames) * 100 : 0) * 100) /
        100,
    }))
    .sort((a, b) => a.value - b.value);

  const dataByDay = newPlayerDatas.scores.reduce((acc, score) => {
    const date = score.game.date.split("T")[0]; // Assuming score.game.date is a timestamp
    if (!acc[date]) {
      acc[date] = {
        kills: 0,
        deaths: 0,
        assists: 0,
        games: 0,
      };
    }
    acc[date].kills += score.game.kills;
    acc[date].deaths += score.game.deaths;
    acc[date].assists += score.game.assists;
    acc[date].games += 1;
    return acc;
  }, {});

  const kdaByDay = Object.entries(dataByDay).map(([date, data]) => {
    kdaDatas.value.push({
      name: date,
      value: data.kda,
    });
    // return {
    //   name: date,
    //   value: kda,
    // };
  });

  newPlayerDatas.scores.map((score) => {
    // console.log("Score: ", score);
    const date = new Date(score.game.date);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} | ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    const mapName = `${score.game.map} | ${formattedDate}`; // Assuming score.game.map is the map name

    kdaPerGame.value.push({
      name: mapName,
      value: Math.round(score.kda * 100) / 100,
      date: formattedDate,
    });
    killsPerGame.value.push({
      name: mapName,
      value: score.kills,
      date: formattedDate,
    });
    deathsPerGame.value.push({
      name: mapName,
      value: score.deaths,
      date: formattedDate,
    });
    assistsPerGame.value.push({
      name: mapName,
      value: score.assists,
      date: formattedDate,
    });
    totalKills.value = totalKills.value + score.kills;
    totalDeaths.value = totalDeaths.value + score.deaths;
    totalAssists.value = totalAssists.value + score.assists;
  });

  // kdaDatas.value = kdaByDay.map((item) => item.name);
  // kdaValues.value = kdaByDay.map((item) => item.value);
});

const handleUpdateKda = (kda) => {
  console.log("ACTION update KDA", kda);
  totalKills.value = kda.kills;
  totalDeaths.value = kda.deaths;
  totalAssists.value = kda.assists;
};

const handleKdaGauge = (spanTitle, data) => {
  console.log("ACTION update KDA", data);
  gaugeSpan.value = spanTitle;
  totalKills.value = data.kills;
  totalDeaths.value = data.deaths;
  totalAssists.value = data.assists;
};
</script>

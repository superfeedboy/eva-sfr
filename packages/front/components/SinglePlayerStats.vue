<template>
  <h1 class="text-xl bold">{{ player.pseudo }}</h1>
  <div class="grid grid-flow-dense grid-cols-6 grid-rows-4 gap-4">
    <!-- <pre>{{ playerDatas }}</pre> -->
    <div class="row-span-2 col-span-4 h-full rounded">
      <div class="h-full grid grid-rows-3 grid-flow-col gap-4">
        <GraphLineChart
          :series="{
            kda: kdaPerGame,
            kills: killsPerGame,
            deaths: deathsPerGame,
            assists: assistsPerGame,
          }"
          @updateKda="handleUpdateKda"
          dataType="Score"
          class="row-span-2"
        />
        <div class="grid grid-cols-6">
          <GraphGaugeChart
            :series="{
              kills: totalKills,
              deaths: totalDeaths,
              assists: totalAssists,
            }"
            dataType="KDA"
            class="col-span-2 row-span-1"
          />
        </div>
      </div>
    </div>
    <div class="row-span-2 col-span-2 grid grid-flow-row gap-4 h-auto">
      <!-- w-96 -->
      <GraphPieChart
        :series="mapsSeries"
        dataType="Map"
        class="h-full rounded"
      />
      <GraphHBarChart
        :series="mapWinRate"
        dataType="WinRate"
        class="h-full rounded"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";

const props = defineProps({
  player: Object,
  playerDatas: Object,
});
const { player, playerDatas } = toRefs(props);
const mapsSeries: Ref<Array<object>> = ref([]);
const mapWinRate: Ref<Array<object>> = ref([]);
const kdaDatas: Ref<Array<object>> = ref([]);
const kdaPerGame: Ref<Array<number>> = ref([]);
const killsPerGame: Ref<Array<number>> = ref([]);
const deathsPerGame: Ref<Array<number>> = ref([]);
const assistsPerGame: Ref<Array<number>> = ref([]);
const totalKills: Ref<number> = ref(0);
const totalDeaths: Ref<number> = ref(0);
const totalAssists: Ref<number> = ref(0);

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

watch(playerDatas, (newPlayerDatas) => {
  // console.log("log:", playerDatas.value.player.scores);
  mapsSeries.value.splice(0, mapsSeries.value.length);
  mapWinRate.value = [];
  kdaDatas.value.splice(0, kdaDatas.value.length);
  kdaPerGame.value.splice(0, kdaPerGame.value.length);
  killsPerGame.value = [];
  deathsPerGame.value = [];
  assistsPerGame.value = [];
  // killsPerGame.value.splice(0, killsPerGame.value.length);
  // deathsPerGame.value.splice(0, deathsPerGame.value.length);
  // assistsPerGame.value.splice(0, assistsPerGame.value.length);
  totalKills.value = 0;
  totalDeaths.value = 0;
  totalAssists.value = 0;
  if (!newPlayerDatas) {
    mapsSeries.value = [];
    return;
  }

  const mapCounts = newPlayerDatas.player.scores.reduce((counts, data) => {
    // console.log("Counts: ", counts);
    // console.log("Data: ", data);

    const mapName = data.game.map; // Remplacez 'map' par le nom de la propriété qui contient le nom de la carte
    if (!counts[mapName]) {
      counts[mapName] = 0;
    }
    counts[mapName]++;
    return counts;
  }, {});

  const mapStats = newPlayerDatas.player.scores.reduce((stats, score) => {
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

  const dataByDay = newPlayerDatas.player.scores.reduce((acc, score) => {
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

  newPlayerDatas.player.scores.map((score) => {
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
</script>

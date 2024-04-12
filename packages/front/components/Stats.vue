<template>
  <div class="flex flex-col w-full h-full">
    <MenuTopBanner
      :dashboardType="dashboardType"
      @playerSelected="loadPlayerDatas"
    />
    <div
      v-if="selectedPlayerId && playerDatas === null"
      class="h-full grid place-content-center"
    >
      <LoadingPage :info="loadingInfo" />
    </div>
    <div v-if="!selectedPlayerId" class="h-full grid place-content-center">
      <h1 class="animate-pulse">Sélectionne un joueur pour voir ses stats!</h1>
    </div>
    <div v-else class="h-full p-4 overflow-auto scroll-smooth">
      <SinglePlayerStats :player="selectedPlayer" :playerDatas="playerDatas" />
      <!-- <h1 class="text-xl bold">{{ selectedPlayer.pseudo }}</h1>
      <h1 class="w-full text-center">Maps</h1>
      <GraphPieChart :series="mapsSeries" dataType="Map" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useDataStore } from "~/stores/datas.store";
import LoadingPage from "./LoadingPage.vue";

const props = defineProps({
  dashboardType: String,
});

const { dashboardType } = toRefs(props);
const dataStore = useDataStore();
const selectedPlayerId: Ref<number | null> = ref(null);
const selectedPlayer: Ref<object | null> = ref(null);
const playerDatas: Ref<object | null> = ref(null);
const loadingInfo: Ref<string> = ref("");

const loadPlayerDatas = (playerId: number) => {
  console.log("Loading player datas:", playerId);
  selectedPlayerId.value = playerId;
  selectedPlayer.value = dataStore.datas.playersList.find(
    (player) => player.playerid === playerId
  );
  loadingInfo.value = `Chargement des stats de ${selectedPlayer.value.pseudo}`;
  dataStore
    .getPlayerDatas(playerId)
    .then(() => {
      playerDatas.value = dataStore.datas.playerDatas;
    })
    .catch((error) => {
      console.error(error);
    });
};

// watch(playerDatas, (newPlayerDatas) => {
//   console.log("log:", playerDatas.value.player.scores);

//   if (!newPlayerDatas) {
//     mapsSeries.value = [];
//     return;
//   }

//   const mapCounts = playerDatas.value.player.scores.reduce((counts, data) => {
//     console.log("Counts: ", counts);
//     console.log("Data: ", data);

//     const mapName = data.game.map; // Remplacez 'map' par le nom de la propriété qui contient le nom de la carte
//     if (!counts[mapName]) {
//       counts[mapName] = 0;
//     }
//     counts[mapName]++;
//     return counts;
//   }, {});

//   mapsSeries.value = Object.entries(mapCounts).map(([name, value]) => ({
//     name,
//     value,
//   }));
// });
</script>

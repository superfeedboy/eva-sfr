<template>
  <div class="flex flex-col w-full h-full">
    <MenuTopBanner
      :dashboardType="dashboardType"
      @playerSelected="loadPlayerDatas"
    />
    <div
      v-if="selectedPlayerId && selectedPlayer === null"
      class="h-full grid place-content-center"
    >
      <LoadingPage :info="loadingInfo" />
    </div>
    <div v-if="!selectedPlayerId" class="h-full grid place-content-center">
      <h1 class="animate-pulse">Sélectionne un joueur pour voir ses stats!</h1>
    </div>
    <div v-else class="h-full p-4 overflow-auto scroll-smooth">
      <SinglePlayerStats :player="selectedPlayer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useDataStore } from "~/stores/datas.store";
import { usePopUpsStore } from "~/stores/popups.store";
import LoadingPage from "./LoadingPage.vue";

import type { Player } from "~/types/DatasSchemes.dt";

const props = defineProps({
  dashboardType: String,
});

const { dashboardType } = toRefs(props);
const selectedPlayerId: Ref<number | null> = ref(null);
const selectedPlayer: Ref<Player | undefined> = ref({} as Player);
const loadingInfo: Ref<string> = ref("");
const dataStore = useDataStore();
const popUpsStore = usePopUpsStore();

const loadPlayerDatas = (playerId: number) => {
  selectedPlayerId.value = playerId;
  selectedPlayer.value = dataStore.datas.playersList.find(
    (player) => player.playerid === playerId
  );
  if (selectedPlayer.value) {
    loadingInfo.value = `Chargement des stats de ${selectedPlayer.value.pseudo}`;
  }
  dataStore.getPlayerDatas(playerId).catch((error) => {
    popUpsStore.setPopUp(
      {
        code: error?.code || 500,
        title: "Erreur",
        message: "Erreur lors du chargement des données du joueur! :(",
        stack: error,
      },
      "error"
    );
  });
};
</script>

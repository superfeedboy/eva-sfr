import { defineStore } from "pinia";
import { api } from "~/api/axios.middleware";
import { dataCompute } from "~/components/graph/utils/dataCompute";

import type { DatasStore } from "~/types/Stores.dt";
import type { DatasScheme, Player, PlayersList } from "~/types/DatasSchemes.dt";

export const useDataStore = defineStore("datas", (): DatasStore => {
  const datas: Ref<DatasScheme> = ref({ playersList: [], playerDatas: null });
  const averages: Ref<object> = ref({});
  const isLoading: Ref<boolean> = ref(true);

  const getDatas = async (): Promise<void> => {
    try {
      if (api.graphql) {
        const response: PlayersList = await api.graphql("fullPlayersDatas", {});
        datas.value.playersList = response.players;
        averages.value = dataCompute.averages(
          response.players.map((player) => player.scores)
        );
      }
    } finally {
      isLoading.value = false;
    }
  };

  const getPlayerDatas = async (playerid: number): Promise<void> => {
    try {
      if (api.graphql) {
        const response: Player = await api.graphql("playerDatas", {
          playerid: playerid,
        });
        console.log("Response: ", response);
        datas.value.playerDatas = response;
      }
    } finally {
      isLoading.value = false;
    }
  };

  return { datas, averages, getDatas, getPlayerDatas, isLoading };
});

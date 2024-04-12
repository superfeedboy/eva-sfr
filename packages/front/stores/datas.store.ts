import axios from "axios";
import { defineStore } from "pinia";
import { api } from "~/api/axios.middleware";

// import type { datas } from "~/types/User";

export const useDataStore = defineStore("datas", () => {
  const datas: Ref<object> = ref({ playersList: [], playerDatas: {} });
  const isLoading = ref(true);

  const getDatas = async (): Promise<void> => {
    const query = `
            query {
                players {
                    playerid
                    pseudo
                    name
                    scores {
                        game {
                            date
                            map
                            team1Score
                            team2Score
                            win
                        }
                        kills
                        deaths
                        assists
                        kda
                        points
                    }
                }
            }
        `;
    try {
      const response = await axios.post("http://localhost:3001/", {
        query: query,
      });
      console.log("Response: ", response.data.data.players);

      datas.value.playersList = response.data.data.players;
      console.log(datas);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Datas have been fetched");
      isLoading.value = false;
    }
  };

  const getPlayerDatas = async (playerid: string): Promise<void> => {
    try {
      const response = await api.graphql("playerDatas", { playerid: playerid });
      console.log("Response: ", response);

      datas.value.playerDatas = response;
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Datas have been fetched");
      isLoading.value = false;
    }
  };

  return { datas, getDatas, getPlayerDatas, isLoading };
});

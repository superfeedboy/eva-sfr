import { createDataObject, addDataToSeries } from "./dataObject";

import type { GameList, GameDatas } from "~/types/DatasSchemes.dt";
import type { kdaSerie, stdDataObject } from "~/types/Graphs.dt";
import type { Tooltip } from "~/types/Tooltip.dt";

export const dataCompute = {
  formattedDate: (date: string | Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  },
  formatXAxis: (datas: kdaSerie[]): string[] => {
    console.log("Formatted XAxis: ", datas);
    let xAxisDatas: string[] = [];
    datas.map((data: kdaSerie) => {
      xAxisDatas.push(`${data.name}, ${data.date}`);
      // xAxisDatas.push(data.name);
    });
    console.log("XAxisDatas: ", xAxisDatas);

    return xAxisDatas;
  },
  // formatTooltip: (datas: GameDatas[]): Tooltip => {
  //   console.log("Formatted Tooltip: ", datas);
  //   datas.map((data: GameDatas) => {
  //     console.log("Data: ", data.data);
  //   });
  // },
  kd: (kills: number, deaths: number) => {
    return Math.round((kills / deaths) * 100) / 100;
  },
  kda: (kills: number, deaths: number, assists: number) => {
    return (
      Math.round(((kills + assists) / (deaths === 0 ? 1 : deaths)) * 100) / 100
    );
  },
  individualKDAPerGame: (gameDatas: Array<GameList>): stdDataObject[] => {
    const kd: stdDataObject = createDataObject("KD", "line", 0);
    const kda: stdDataObject = createDataObject("KDA", "line", 0);
    const kills: stdDataObject = createDataObject("Kills", "line", 0);
    const deaths: stdDataObject = createDataObject("Deaths", "line", 0);
    const assists: stdDataObject = createDataObject("Assists", "line", 0);
    const points: stdDataObject = createDataObject("Points", "line", 1);
    const win: stdDataObject = createDataObject("Win", "bar", 2);
    const kdaDatas: Array<stdDataObject> = [
      kd,
      kda,
      kills,
      deaths,
      assists,
      points,
      win,
    ];

    addDataToSeries(kills, (score: GameList) => score.kills, gameDatas);
    addDataToSeries(deaths, (score: GameList) => score.deaths, gameDatas);
    addDataToSeries(assists, (score: GameList) => score.assists, gameDatas);
    addDataToSeries(
      kd,
      (score: GameList) => dataCompute.kd(score.kills, score.deaths),
      gameDatas
    );
    addDataToSeries(
      kda,
      (score: GameList) =>
        dataCompute.kda(score.kills, score.deaths, score.assists),
      gameDatas
    );
    addDataToSeries(points, (score: GameList) => score.points, gameDatas);
    addDataToSeries(
      win,
      (score: GameList) => (score.game.win ? 1 : 0),
      gameDatas
    );

    return kdaDatas;
  },
  totalWins: (games: GameList[]): number => {
    let totalWins = games.reduce((acc: number, game: GameList) => {
      return game.game.win ? acc + 1 : acc;
    }, 0);
    return totalWins;
  },
  globalWinRate: (wins: number, games: number): number => {
    let test = Math.round((wins / games) * 100) || 0;
    return test;
  },
  totalPoints: (games: GameList[]): number => {
    console.log("Games: ", games);

    let totalPoints = games.reduce((acc: number, game: GameList) => {
      return acc + game.points;
    }, 0);
    console.log("Total Points: ", totalPoints);

    return Math.round(((totalPoints / games.length) * 100) / 100) || 0;
  },
  computePoints: (kills: number, deaths: number, assists: number) => {
    return kills + assists - deaths;
  },
  computeWinrate: (wins: number, losses: number) => {
    return wins / (wins + losses);
  },
  averages: (datas: Array<GameList[] | []>) => {
    console.log("Averages:", datas);
    // datas.reduce((acc, curr) => {
    //   console.log("Acc: ", acc);
    //   console.log("Curr: ", curr);
    // });
    return {};
  },
};

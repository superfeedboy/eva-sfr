import { dataCompute } from "~/components/graph/utils/dataCompute";

import type { stdDataObject } from "~/types/Graphs.dt";
import type { GameList } from "~/types/DatasSchemes.dt";

export const createDataObject = (
  name: string,
  type: string,
  yAxisIndex?: number,
  areaStyle?: object
): stdDataObject => {
  return {
    name,
    type,
    showSymbol: false,
    data: [],
    yAxisIndex,
    areaStyle,
  };
};

export const addDataToSeries = (
  series: stdDataObject,
  computeFunction: Function,
  gameDatas: GameList[]
) => {
  return gameDatas.map((score) => {
    series.data.push({
      name: score.game.map,
      value: computeFunction(score),
      date: dataCompute.formattedDate(score.game.date),
    });
  });
};

import type { DatasScheme } from "./DatasSchemes.dt";
import type { GraphList } from "./Graphs.dt";

export interface DatasStore {
  datas: Ref<DatasScheme>;
  averages: Ref<object>;
  isLoading?: Ref<boolean>;
  getDatas: () => Promise<void>;
  getPlayerDatas: (playerid: number) => Promise<void>;
}

export interface GraphsStore {
  graphType: Record<string, GraphList>;
  graphs: Record<string, GraphList>;
  setGraph: () => Promise<void>;
}

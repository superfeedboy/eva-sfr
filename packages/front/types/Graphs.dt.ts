import type { ComposeOption } from "echarts/core";
import type {
  LegendComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from "echarts/components";
import type { LineSeriesOption, BarSeriesOption } from "echarts/charts";

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | LineSeriesOption
  | BarSeriesOption
>;

export type kdaSerie = {
  name: string;
  value: Array<number>;
  date: string;
};

export type stdDataObject = {
  name: string;
  type: string;
  yAxisIndex?: number;
  areaStyle?: object;
  showSymbol?: boolean;
  data: Array<object>;
};

export type Graph = {
  id: string;
  series: object | Array<object | string>;
  options: EChartsOption | object;
  darkMode?: boolean;
};

export type GraphList =
  | {
      [key: string]: Graph;
    }
  | Record<string, Graph>;

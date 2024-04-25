import { colors } from "./colors";

import type { Graph } from "~/types/Graphs.dt";
import type { Tooltip } from "~/types/Tooltip.dt";

export const drawTooltip = (datas: Tooltip) => {
  let tooltip = `
    <span
      style='
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        font-size: .8em;
        background-color: rgb(184, 169, 252);
        width: 100%;
        padding: 4px;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px 4px 0 0;
        color: white;
      '>
      <span>
        ${datas.date}
      </span>
      <span> - </span>
      <span>
        ${datas.time}
      </span>
    </span>
    <br/>
    <span
      style='
        font-weight: bold;
        font-size: 1.2
      '>
      ${datas.map}
    </span>: ${datas.kda?.kda}
    <span
      style='
        font-size: .7em;
        font-style: italic;
      '>
      KDA
    </span>
    <br/>`;
  if (datas.kda) {
    Object.entries(datas.kda).map(([key, value]) => {
      tooltip += `
          <span>
            <svg width="20" height="20" style="display: inline-block;">
              <defs>
                <linearGradient id="grad-${key}" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stop-color="${colors([key], "light")}" />
                  <stop offset="100%" stop-color="${colors([key], "dark")}" />
                </linearGradient>
              </defs>
              <circle cx="8" cy="8" r="5" fill="url(#grad-${key})"
              />
            </svg>
          </span>
          <span>`;
      key !== "win"
        ? (tooltip += `<b>${value}</b> ${key}`)
        : (tooltip += `<b>${value ? "Win" : "Loss"}</b>`);
      tooltip += `</span>
          <br/>`;
    });
  }
  return tooltip;
};

export const getTooltipValue = (datas: Graph, name: string, index: number) => {
  const seriesItem =
    Array.isArray(datas.series) &&
    datas.series.find((item) => item.name === name);
  return seriesItem?.data[index].value;
};

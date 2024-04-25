import type {
  ColorScheme,
  ColorType,
  GraphColorScheme,
} from "~/types/ColorSchemes.dt";

export const colors = (
  colorSeries: Array<string>,
  colorType?: null | ColorType
) => {
  const availableSeries: ColorScheme = {
    kd: { light: "rgb(250, 127, 213)", dark: "rgb(252, 38, 188)" },
    kda: { light: "rgb(184, 169, 252)", dark: "rgb(112, 93, 206)" },
    kills: { light: "rgb(171, 245, 207)", dark: "rgb(79, 255, 164)" },
    deaths: { light: "rgb(245, 154, 184)", dark: "rgb(237, 62, 120)" },
    assists: { light: "rgb(252, 223, 154)", dark: "rgb(247, 184, 36)" },
    points: { light: "rgb(134, 160, 247)", dark: "rgb(21, 65, 209)" },
    win: { light: "rgba(255, 224, 145, .1)", dark: "rgba(255, 196, 48, .1)" },
  };
  if (
    colorType &&
    typeof colorType === "string" &&
    ["light", "dark"].includes(colorType) &&
    colorSeries[0] in availableSeries
  ) {
    return availableSeries[colorSeries[0] as string][colorType];
  }
  const colors: Array<GraphColorScheme> = [];
  colorSeries.map((serie) => {
    serie = serie.toLowerCase();
    colors.push({
      type: "linear",
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: availableSeries[serie].light,
        },
        {
          offset: 1,
          color: availableSeries[serie].dark,
        },
      ],
      global: false,
    });
  });
  return colors;
};

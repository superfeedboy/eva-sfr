export type ColorScheme = {
  [key: string]: {
    light: string;
    dark: string;
  };
};

export type GraphColorScheme = {
  type: string;
  x: number;
  y: number;
  x2: number;
  y2: number;
  colorStops: Array<{
    offset: number;
    color: string;
  }>;
  global: boolean;
};

export type ColorType = "light" | "dark";

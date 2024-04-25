export type GameDatas = {
  date: Date | string;
  map: string;
  team1Score: number;
  team2Score: number;
  win: boolean;
};

export type GameList = {
  game: GameDatas;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  points: number;
};

export type Player = {
  playerid: number;
  pseudo: string;
  name: string;
  scores: GameList[];
};

export type PlayersList = {
  players: Player[];
};

export type DatasScheme = {
  playersList: Player[];
  playerDatas: Player | null;
};

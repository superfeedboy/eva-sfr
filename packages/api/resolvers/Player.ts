import { Game } from "@api/models/Games";
import { Player } from "@api/models/Players";
import { Score } from "@api/models/Scores";

export const resolvers = {
  Query: {
    player: async (_, { playerid }) => {
      const player = await Player.findByPk(playerid);
      return player;
    },
    players: async () => {
      const players = await Player.findAll();
      return players;
    },
  },
  Player: {
    games: async (player) => {
      const scores = await Score.findAll({
        where: { playerid: player.playerid },
      });
      const games = await Promise.all(
        scores.map((score) => {
          if (score.gameid) {
            return Game.findByPk(score.gameid);
          }
        })
      );
      return {
        list: games,
        count: games.length,
      };
    },
    scores: async (player) => {
      const scores = await Score.findAll({
        where: { playerid: player.playerid },
      });
      return scores;
    },
  },
  Mutation: {
    addPlayer: (_, { input }) => {
      return "Pas de mutation pour le moment";
    },
  },
};

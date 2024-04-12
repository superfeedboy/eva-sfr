import { GameMap } from "@api/models/GameMaps";
import { Game } from "@api/models/Games";
import { Score } from "@api/models/Scores";
import { Season } from "@api/models/Seasons";

export const resolvers = {
	Query: {
		game: async (_, { gameid }) => {
			const game = await Game.findByPk(gameid);
			return game;
		},
		games: async () => {
			const games = await Game.findAll();
			return games;
		},
	},
	Game: {
		seasonname: async (game) => {
			const season = await Season.findByPk(game.seasonid);
			return season ? season.seasonname : null;
		},
		date: (game) => game.gamedate,
		map: async (game) => {
			const map = await GameMap.findByPk(game.mapid);
			return map.mapname;
		},
		team1Score: (game) => game.score1,
		team2Score: (game) => game.score2,
		team: (game, _, { playerid }) => {
			const score = Score.findOne({
				where: { gameid: game.gameid, playerid: playerid },
			});
			return score.team;
		},
		win: (game) => {
			console.log("Team: ", game.team);

			return (game.score1 > game.score2 ? 1 : 2) === game.team;
		},
	},
};

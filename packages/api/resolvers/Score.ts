import { Game } from "@api/models/Games";
import { Score } from "@api/models/Scores";

export const resolvers = {
	Query: {
		score: async (_, { gameid }) => {
			const score = await Score.findByPk(gameid, { include: Game });
			return score;
		},
		scores: async () => {
			const scores = await Score.findAll();
			return scores;
		},
	},
	Mutation: {
		addScore: (_, { input }) => {
			console.log(input);

			return "Pas de mutation pour le moment";
		},
	},
	Score: {
		game: async (score) => {
			const game = await Game.findByPk(score.gameid);
			game.team = score.team;
			return game;
		},
		kills: async (score) => score.kills,
		deaths: (score) => score.deaths,
		assists: (score) => score.assists,
		kda: (score) => (score.kills + score.assists) / Math.max(1, score.deaths),
		kd: (score) => score.kills / Math.max(1, score.deaths),
	},
};

import { Season } from "@api/models/Seasons";

export const resolvers = {
	Query: {
		season: async (_, { seasonname }) => {
			const season = await Season.findByPk(seasonname);
			return season;
		},
		seasons: async () => {
			const seasons = await Season.findAll();
			return seasons;
		},
	},
};

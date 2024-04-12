import { GameMap } from "@api/models/GameMaps";

export const resolvers = {
	Query: {
		map: async (_, { mapname }) => {
			const map = await GameMap.findByPk(mapname);
			return map;
		},
		maps: async () => {
			const maps = await GameMap.findAll();
			return maps;
		},
	},
};

import { sequelize } from "@api/db/sequelize";
import { DataTypes } from "sequelize";

const GameMap = sequelize.define(
	"maps",
	{
		mapid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		mapname: {
			type: DataTypes.STRING(32),
			allowNull: false,
		},
	},
	{ timestamps: false },
);

export { GameMap };

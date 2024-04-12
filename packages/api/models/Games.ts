import { sequelize } from "@api/db/sequelize";
import { DataTypes } from "sequelize";

const Game = sequelize.define(
	"games",
	{
		gameid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		seasonid: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		gamedate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		mapid: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		score1: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		score2: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{ timestamps: false },
);

export { Game };

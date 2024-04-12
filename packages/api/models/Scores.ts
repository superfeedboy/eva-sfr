import { sequelize } from "@api/db/sequelize";
import { DataTypes } from "sequelize";

const Score = sequelize.define(
	"scores",
	{
		gameid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		playerid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		team: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		kills: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		deaths: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		assists: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		points: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{ timestamps: false },
);

export { Score };

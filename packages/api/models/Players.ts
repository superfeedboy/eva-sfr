import { sequelize } from "@api/db/sequelize";
import { DataTypes } from "sequelize";

const Player = sequelize.define(
	"players",
	{
		playerid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		pseudo: {
			type: DataTypes.STRING(32),
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(32),
			allowNull: false,
		},
	},
	{ timestamps: false },
);

export { Player };

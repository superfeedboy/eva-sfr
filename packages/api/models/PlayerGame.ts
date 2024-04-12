import { sequelize } from "@api/db/sequelize";
import { DataTypes, Model, Sequelize } from "sequelize";

export class PlayerGame extends Model {
	public playerid!: number;
	public gameid!: number;
}

PlayerGame.init(
	{
		playerid: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
		},
		gameid: {
			type: DataTypes.INTEGER.UNSIGNED,
			primaryKey: true,
		},
	},
	{
		sequelize,
		tableName: "PlayerGame",
	},
);

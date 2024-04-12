import { sequelize } from "@api/db/sequelize";
import { DataTypes } from "sequelize";

const Season = sequelize.define(
	"seasons",
	{
		seasonid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		seasonname: {
			type: DataTypes.STRING(32),
			allowNull: false,
		},
	},
	{ timestamps: false },
);

export { Season };

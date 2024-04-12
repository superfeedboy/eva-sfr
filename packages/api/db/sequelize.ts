import { DataTypes, Sequelize } from "sequelize";

export const sequelize = new Sequelize("eva", "root", "eva-sfr", {
	host: "localhost",
	dialect: "mysql",
	logging: false,
});

export const syncDb = async () => {
	sequelize.sync({ force: false }).then((res) => {
		console.log(
			"🛠️   Following models have been synchronized with the database:",
		);
		for (const [index, value] of Object.entries(res.models)) {
			console.log(`    ✅ ${index}`);
		}
	});
};

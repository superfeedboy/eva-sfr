import { GameMap } from "./GameMaps";
import { Game } from "./Games";
import { Player } from "./Players";
import { Score } from "./Scores";
import { Season } from "./Seasons";

// Joins
// import { PlayerGame } from "./PlayerGame";

// Player.belongsToMany(Game, { through: "PlayerGame" });
// Game.belongsToMany(Player, { through: "PlayerGame" });
// Game.hasOne(Season, { foreignKey: "seasonid", as: "season" });
// Score.belongsTo(Game, { foreignKey: "gameid" });
// Score.hasOne(Player, { foreignKey: "playerid" });

Player.hasMany(Score, { foreignKey: "playerid" });
Score.belongsTo(Player, { foreignKey: "playerid" });
Score.hasOne(Game, { foreignKey: "gameid" });
Game.hasMany(Score, { foreignKey: "gameid" });
Game.hasOne(Season, { foreignKey: "seasonid" });
Season.hasMany(Game, { foreignKey: "seasonid" });
Game.hasOne(GameMap, { foreignKey: "mapid" });
GameMap.hasMany(Game, { foreignKey: "mapid" });

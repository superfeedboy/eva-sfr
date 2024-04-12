interface Queries {
  [key: string]: string;
}

export const queries: Queries = {
  playersList: `
    query {
        players {
            playerid
            pseudo
            name
        }
    }`,
  playerDatas: `
    query GetPlayerData($playerid: ID!) {
        player(playerid: $playerid) {
            playerid
            pseudo
            name
            scores {
                game {
                    date
                    map
                    team1Score
                    team2Score
                    win
                }
                kills
                deaths
                assists
                kda
                points
            }
        }
    }`,
};

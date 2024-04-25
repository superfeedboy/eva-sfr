interface Queries {
  [key: string]: string;
}

export const gqlQuery: Queries = {
  playersList: `
    query {
        players {
            playerid
            pseudo
            name
        }
    }`,
  fullPlayersDatas: `
    query {
        players {
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
    }
    `,
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

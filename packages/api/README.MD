# EVA - SFR : API

## Backend de la webapp EVA - SFR

![nodejs](https://img.shields.io/badge/-NodeJS-339933?logo=nodedotjs&logoColor=white) ![Typescript](https://img.shields.io/badge/-TypeScript-3178C6?logo=tsnode&logoColor=white) ![jwt.io](https://img.shields.io/badge/-JsonWebTokens-000000?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MiIgdmlld0JveD0iMCAwIDQzNCA0MzgiPjxwYXRoIGQ9Ik0tMjAwLTE5NS44MzNoODMzLjMzM1Y2MzcuNUgtMjAweiIvPjxwYXRoIGQ9Ik0yNDcuOTE3IDEyNC41ODNWMTIuNWgtNjIuNXYxMTIuMDgzbDMxLjI1IDQyLjkxNyAzMS4yNS00Mi45MTdaTTE4NS40MTcgMzE3LjA4M3YxMTIuMDg0aDYyLjVWMzE3LjA4M2wtMzEuMjUtNDIuOTE2LTMxLjI1IDQyLjkxNloiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJtMjQ3LjkxNyAzMTcuMDgzIDY1LjgzMyA5MC44MzQgNTAuODMzLTM3LjA4NC02Ni4yNS05MC40MTYtNTAuNDE2LTE2LjY2N3Y1My4zMzNaTTE4NS40MTcgMTI0LjU4MyAxMTkuNTgzIDMzLjc1IDY4Ljc1IDcwLjgzMyAxMzUgMTYxLjI1bDUwLjQxNyAxNi42Njd2LTUzLjMzNFoiIHN0eWxlPSJmaWxsOiMwMGYyZTYiLz48cGF0aCBkPSJNMTM1IDE2MS4yNSAyOC4zMzMgMTI2LjY2NyA4Ljc1IDE4Ni4yNWwxMDYuNjY3IDM0LjU4MyA1MC44MzMtMTYuMjVMMTM1IDE2MS4yNVpNMjY3LjA4MyAyMzcuMDgzbDMxLjI1IDQzLjMzNEw0MDUgMzE1bDE5LjU4My01OS41ODMtMTA2LjY2Ni0zNC41ODQtNTAuODM0IDE2LjI1WiIgc3R5bGU9ImZpbGw6IzAwYjlmMSIvPjxwYXRoIGQ9Im0zMTcuOTE3IDIyMC44MzMgMTA2LjY2Ni0zNC41ODNMNDA1IDEyNi42NjcgMjk4LjMzMyAxNjEuMjVsLTMxLjI1IDQzLjMzMyA1MC44MzQgMTYuMjVaTTExNS40MTcgMjIwLjgzMyA4Ljc1IDI1NS40MTcgMjguMzMzIDMxNSAxMzUgMjgwLjQxN2wzMS4yNS00My4zMzQtNTAuODMzLTE2LjI1WiIgc3R5bGU9ImZpbGw6I2Q2M2FmZiIvPjxwYXRoIGQ9Im0xMzUgMjgwLjQxNy02Ni4yNSA5MC40MTYgNTAuODMzIDM3LjA4NCA2NS44MzQtOTAuODM0VjI2My43NUwxMzUgMjgwLjQxN1pNMjk4LjMzMyAxNjEuMjVsNjYuMjUtOTAuNDE3TDMxMy43NSAzMy43NWwtNjUuODMzIDkwLjgzM3Y1My4zMzRsNTAuNDE2LTE2LjY2N1oiIHN0eWxlPSJmaWxsOiNmYjAxNWIiLz48L3N2Zz4=) ![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?logo=sequelize&logoColor=white) ![Sentry](https://img.shields.io/badge/-Sentry-362D59?logo=sentry&logoColor=white)

### Structure

L'API, développée TypeScript, composée d'un moteur principal et de routes qui contiennent chacunes:

- le fichier de route
- la validateur
- le controlleur

L'API embarque ensuite des services et des modèles qui utiliseront sequelize pour parler à la DB SQL.

### Fonctionnalités

L'API va surtout servir d'interfaçage entre le front en VueJS et la DB SQL. Le but ici est de récupérer des datas de la DB SQL, de les controller, calculer différentes métriques utiles/intéressantes puis renvoyer des set (tableaux) de données formattés pour le front.

Il n'est, pour le moment, pas prévu de s'interfacer avec d'autres services. Etant donné qu'il n'est à priori pas prévu qu'il y ai d'authentification sur le front, l'API n'aura pas particulièrement de lien avec des services d'authentification externe de type google, facebook, discord,...

### Sécurité

Les données de la DB SQL ne contiendront aucune réelle donnée nominative. Il n'est donc pas nécessaire de générer des gros modules de sécurisation. Nous nous reposeront principalement sur:

- un JWT pour authentifier les requêtes du front vers le back
- une exclusion CORS
- un validateur par route pour s'assurer des données que l'on demande/envoie
- un typage commun front/back

### Suivi des performances

Nous utiliserons Sentry pour suivre les performances de l'API et détecter les erreurs.

### Gestion des erreurs

Choix est fait de renvoyer le maximum d'informations utilisables au front lors d'erreurs.

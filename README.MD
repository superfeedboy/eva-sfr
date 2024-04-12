# EVA-SFR

## Structure globale du projet

La webapp se compose de 2 éléments principaux:

- l'API
- le frontend

Ces 2 éléments sont répertoriés sous `packages`.

## API

L'API est là pour gérer les transactions entre le frontend et la base de données SQL (voire éventuellement avec d'autres projets/services si besoin). Les données récupérées seront calculés par dans l'API avnat d'être retournées au front.

_Pour plus d'informations sur le fonctionnement de l'API, se reporter au README.MD de `packages/api`._

## FRONTEND

Le Frontend _(ou simplement 'front')_ correspond à la vue qu'auront les utilisateurs. Si l'API est le moteur, le front est la carrosserie.

Le front demandera les données à l'API et les affichera sous forme de fraphiques.

_Pour plus d'informations sur le fonctionnement de l'API, se reporter au README.MD de `packages/front`._

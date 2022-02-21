# React challenge

## Instructions

Objectif : Montrer tes compétences en React et Typescript, ainsi que découvrir notre stack technique.

La stack du challenge est composée de :   
    - React.js  
    - Typescript 
    - redux 
    - react-redux  
    - redux-thunk  
    - GraphQL  
    - json-graphql-server (pour la mock data)  
    - Material UI  
    - Styled Components  
    *- Optionnel : react-apollo*

Ces librairies devront être installées en utilisant `yarn`.

**Attention :** Afin de suivre ton progrès, tu devras commit ton code à chaque étape. Tu peux soit :
- nous envoyer un lien public vers le repository de ton Github
- nous envoyer ton dossier complet **en incluant le dossier .git** 

À noter : tu as carte blanche sur le style de la page, tant que tu utilises Material UI et les Styled Components.

A tout moment, si tu es bloqué, n'hésite pas à chercher de l'aide sur Internet, ou à contourner le problème autrement.

## Résultat final : 

À la fin de l'exercice, le fichier `App.ts` devrait retourner ceci : 

```
<div>
    <QuestionList />
    <QuestionForm />
</div>
```

Libre à toi d'inclure plusieurs sous-composants ou non à l'intérieur des deux composants principaux !
## Première étape - Boilerplate

Objectif : créer la structure du projet

Pour se faire, le mieux est d'utiliser [Create React App](https://github.com/facebook/create-react-app).

Tu peux directement créer une app Redux + Typescript avec le template `redux-typescript`.

 Tu devras également installer un faux serveur GraphQL (https://github.com/marmelab/json-graphql-server) afin de traiter les mock data qui se trouvent dans le fichier `db.ts` que l'on a transmis avec les instructions.

**Attention :** Pour ne pas créer de conflit entre l'app React et le serveur, il faut lancer le serveur avant l'app React.

#### NB : OK

## Seconde étape - Configurer Redux

Libre à toi de choisir comment organiser tes fichiers concernant Redux, selon ce qu'il te semble plus pertinent.

#### NB : fait en avançant dans le challenge

## Troisième étape - Afficher les questions / réponses

Le but de cette étape est de récupérer les questions et les réponses du server et de les afficher. 

Les informations devant être affichées :  
  - La question  
  - La réponse  
  - L'auteur de la question

#### NB : OK

## Quatrième étape - Ajouter une question

Il faut créer un nouveau composant contenant le formulaire de création d'une question. Il faut pouvoir indiquer les mêmes informations que pour l'affichage d'une question (c.f. la troisième étape).

Lorsqu'une question a été ajoutée, la liste doit être actualisée avec la nouvelle question.

#### NB : OK

## Cinquième étape - Chercher une question

Le but est d'ajouter un champ texte où l'on peut indiquer une chaîne de caractères à chercher parmi les questions.

Bonus : implémenter la logique non seulement pour les questions, mais aussi les réponses.

#### NB : OK

## Étape bonus

Si jamais tu es encore friand de challenges, voici quelques idées d'ajouts : 

### Bonus 1 : Ajouter un loader

L'utilisateur ne sachant pas ce qu'il se passe au chargement de la reqûete, ajouter un loader afin de l'informer de ce qu'il se passe.

#### NB : OK

### Bonus 2 : CRUD

Il est possible d'afficher et de créer une question, mais tu peux également ajouter l'édition et la suppression d'une question !

#### NB : OK

### Bonus 3 : Tests

Ajouter différents tests (unitaires, intégration, etc.).

#### NB : OK

### Bonus 4 : Styling

Comme dit au début de l'exercice, tu as carte blanche sur le style de l'application.

### Bonus 5 : Utiliser `react-apollo`

React-apollo permet de mieux gérer les requêtes GraphQL !

Si tu as d'autres idées d'améliorations, n'hésite pas et fonce !


### Instructions

--Démarrage--

`yarn` : installation des dépendances

`yarn serve` : démarre le faux serveur GraphQL sur `localhost:3001`

`yarn watch` : lance l'application, surveille le répertoire `src` et redémarre l'appli en cas de modification sur `localhost:3000`

`yarn test` : lance les tests

const express = require('express');

//Instancier l'application serveur
const app = express();

//Mock List viennoiseries
let DB_VIENNOISERIES = [
    'Pain au chocolat',
    'Beurre Doux',
    'Croissant',
    'Pain aux raisins',
    'Nutella',
    'Galette saucisse'
];
//Déclarer des routes
app.get('/viennoiseries', (request, response) => {
    //Retourner la réponse json
    return response.json(DB_VIENNOISERIES);
});

//Démarrer
//param 1 le port où on lance le serveur
//param 2 que faire quand le serveur a démmaré (afficher un log)
app.listen(3000, () => {
    console.log("Le serveur a démarré");
});
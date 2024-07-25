const express = require('express');

//Instancier l'application serveur
const app = express();

// ----------------------------------------------------------
// * SWAGGER UI
// ----------------------------------------------------------
const swaggerUI = require('swagger-ui-express');
// -- importer la doc swagger la doc swagger généré
const swaggerDocument = require('../swagger-output.json');
// utiliser le swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//Mock List viennoiseries
let DB_VIENNOISERIES = [
    'Pain au chocolat',
    'Beurre Doux',
    'Croissant',
    'Pain aux raisins',
    'Nutella',
    'Galette saucisse'
];

function responseService(response, code, message, data) {
        return response.json({code: code, message: message, data: data});
}

//Déclarer des routes
app.get('/viennoiseries', (request, response) => {
// #swagger.summary = 'La route qui permet de récupérer les pains au chocolat'

    //Retourner la réponse json
    return responseService(response, '200', 'Les données ont été récupérées', DB_VIENNOISERIES);

});


//Démarrer
//param 1 le port où on lance le serveur
//param 2 que faire quand le serveur a démmaré (afficher un log)
app.listen(3000, () => {
    console.log("Le serveur a démarré");
});
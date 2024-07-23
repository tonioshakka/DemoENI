//Importer express
const express = require('express');

//Instancier le serveur
const app = express();

//========================BDD==========================
//Importer mongoose
const mongoose = require('mongoose');

//Ecouter quand la connexion success
mongoose.connection.once('open', () => {
    console.log(`Connecté à la BDD`)
});
//Ecouter quand la connexion plante
mongoose.connection.on('error', (er) => {
    console.log(`Erreur de BDD : ${err}`)
});
 //Se connecter à mongodb
mongoose.connect("mongodb://localhost:27017/db_demo_eni");

//======================================================

//Lancer le serveur
app.listen(3000, () => {
    console.log(`Le serveur a démarré`);
});
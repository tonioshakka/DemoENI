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

//Declarer le modele Person
//1 : Nom pour les relations dans le code JS (on n'utilise pas pour le moment)
//2 : Les attributs attendus pour ce Model
//3 : Le nom de la collection (Table en SQL) en base liée
const Person = mongoose.model('Person', {uid : String, pseudo : String}, 'persons');


//======================================================

app.get('/persons', async (request, response) => {

    //SelectAll de persons
    const persons = await Person.find();

    return response.json(persons);
})


//Lancer le serveur
app.listen(3000, () => {
    console.log(`Le serveur a démarré`);
});
//Importer express et uuid (génération auto des id)
const express = require('express');
const { v4: uuidv4} = require('uuid');

//Instancier le serveur
const app = express();

//Autoriser à envoyer des données dans le request body
app.use(express.json());
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

app.get('/person/:id', async (request, response) => {
    //Récuperer l'id
    const idParam = request.params.id;

    //Select une personne par son id
    const foundPerson = await Person.findOne({ uid : idParam});

    //Si je ne trouve pas
    if (!foundPerson) {
        return response.json({message : `La personne n'existe pas!!!!`})
    }

    //Par defaut si aucune erreur -> retourner la personne trouvée en Json
    return response.json(foundPerson)
});

app.post('/save-person', async (request, response) => {
    
    //Récuperer la personne envoyée
    const personJson = request.body;

    //-- métier: Générer l'id
    personJson.uid = uuidv4();

    //Instancier une personne en tant que Model Mongo
    const createdPerson = await Person.create(personJson);

    //La persister en base (sauvegarder)
    //await createdPerson.save();
    
    return response.json(createdPerson);
});









//Lancer le serveur
app.listen(3000, () => {
    console.log(`Le serveur a démarré`);
});
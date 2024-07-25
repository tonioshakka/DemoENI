const express = require('express');
const { v4: uuidv4} = require('uuid');

const app = express();
// Autoriser express à recevoir des donnée envoyer en JSOn dans le body (Le fameux Payload)
app.use(express.json());

// MOCK
// Simulation de données en mémoire
let DB_Articles = [
   { id: 1, title: 'Vélo', content: 'VTT', author: 'Isaac' },
    { id: 2, title: 'Menottes', content: 'Jouet pour couples', author: 'Sanchez' },
    { id: 3, title: 'banane', content: 'Fruit pour singes', author: 'Toto' },
    { id: 4, title: 'Aire autoroute', content: 'Lieu pour abandonner belle maman', author: 'Isaac' },
    { id: 5, title: 'Telephone', content: 'Lieu de drague', author: 'Isaac' },

]; 
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
mongoose.connect("mongodb://localhost:27017/db_article");

const Article = mongoose.model('Article', {uid : String, title : String, content : String}, 'articles');


// Routes

/**
 * Fonction utilitaire pour retourner une structure de réponse métier
 * @param {*} response
 * @param {*} code
 * @param {*} message
 * @param {*} data
 * @returns
 */
function responseService(response, code, message, data) {
        return response.json({code: code, message: message, data: data});
}


app.get('/articles', async (request, response) => {
    const articles = await Article.find();
    return responseService(response, '200', 'La liste des articles a été récupérés avec succès', articles);
});

app.get('/article/:id',  async (request, response) => {

    // Il faut l'id 
    const id = request.params.id;

    // Le code qui retrouve l'article ayant l'attribut id === l'id en param
    const foundArticle = await Article.findOne({uid : id});

    return responseService(response, '200', 'Article récupéré avec succès', foundArticle);
});

app.post('/save-article/users/authenticate', async (request, response) => {

    // Récupérer l'article envoyé en json
    const articleJSON = request.body;
    articleJSON.uid = uuidv4();

    // TODO : Controle de surface (valider les données)

    let foundArticle = null;
    //----------------------------------------------------------------
    //Edition
    //----------------------------------------------------------------
    // Est-ce on a un id envoyer dans le json
    if (articleJSON.id != undefined || articleJSON.id) {
        // essayer de trouver un article existant
        foundArticle = await Article.findOne({uid : id});
    

        // Si je trouve l'article à modifier 
        if (!foundArticle) {
            return response.json(response, '701', 'Impossible d ajouter un article avec un titre déjà existant', null );
        }

            //Mettre à jour les attributs
            foundArticle.title = articleJSON.title;
            foundArticle.content = articleJSON.content;
            foundArticle.author = articleJSON.author;

            //Sauvegarder en base
            await foundArticle.save();

            //Retourner message de succés
            return responseService(response, '200', 'Article modifié avec succès', foundArticle);
        }
    
    //----------------------------------------------------------------
    //Creation
    //----------------------------------------------------------------
    // Instancier un article Mongo
    const createArticle = await Article.create(articleJSON);

    //Génère un id
    createArticle.uid = uuidv4();

    //Sauvegarder en base
        await createArticle.save();

    //Message succès    
        return responseService(response, '200', 'Article ajouté avec succès', createArticle);


});

app.post('/auth' , (request, response) => {

            return responseService(response, '200', 'Authentifié(e) avec succès ', token);   

});

app.delete('/article/:id/users/authenticate', async (request, response) => {

    
    // Il faut l'id 
    const id = request.params.id;

    // trouver un article
    const foundArticle = await Article.findOne({uid : id});

    // si article non trouve erreur
    if (!foundArticle) {
        return responseService(response, '702', 'Impossible de supprimer un article dont l UID n existe pas ', null);   
    };
    // supprimer grace à l'index
    await foundArticle.deleteOne();
    return responseService(response, '200', 'article ${id} a été supprimé avec succès ', foundArticle);
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log(`le serveur à démarré`);
});
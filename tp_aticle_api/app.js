const express = require('express');

const app = express();

//Mock
let articles = [
    { id: 1, title: 'Vélo', content: 'VTT', author: 'Isaac' },
    { id: 2, title: 'Menottes', content: 'Jouet pour couples', author: 'Sanchez' },
    { id: 3, title: 'banane', content: 'Fruit pour singes', author: 'Toto' },
    { id: 4, title: 'Aire autoroute', content: 'Lieu pour abandonner belle maman', author: 'Isaac' },
    { id: 5, title: 'Telephone', content: 'Lieu de drague', author: 'Isaac' },

]; 
//Autoriser express à reeçevoir des données envoyées en Json dans le body( payload)
app.use(express.json());
app.get('/articles', (request, response)=> {
    return response.json(articles)
});

app.get('/article/:id' , (request, response)=> {
    const id = parseInt(request.params.id, 10);
    const article = articles.find(a => a.id === id);

    if (article) {
        return response.json(article);
    } else {
        return response.status(404).json({ message: 'Article non trouvé' });
    }
});

app.post('/save-article', (request, response) => {
    const newArticle = request.body;

    // Vérification de l'unicité basée sur l'ID
    const articleExists = articles.some(article => article.id === newArticle.id);

    if (articleExists) {
        // Mise à jour de l'article existant
        articles = articles.map(article => article.id === newArticle.id ? newArticle : article);
        return response.status(200).json({ message: "Article modifié avec succès" });
    } else {
        // Ajout du nouvel article
        articles.push(newArticle);
        return response.status(201).json({ message: "Article créé avec succès" });
    }
});

app.delete('/article/:id', (request, response)=> {
        
    
        const id = parseInt(request.params.id, 10);
        const articleIndex = articles.findIndex(a => a.id === id);
        articles.splice(articleIndex, 1)

    return response.json({message : "delete"})
});



app.listen(3000, () => {
    console.log("Le serveur a démarré");
});
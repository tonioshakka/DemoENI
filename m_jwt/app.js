const express = require('express');
const jwt = require('jsonwebtoken');

//clé secrete
const JWT_SECRET = "pain_au_chocolat";

// Instancier l'application serveur
const app = express();

// Déclarer des routes

app.get('/check', (request, response) => {
 
    // extraire le token (qui est bearer)
    const token = request.headers.authorization.substring(7);
 
    result = jwt.verify(token, JWT_SECRET);
 
    // Si token incorrect
    if (!result) {
        return response.json({ message: "token pas bon" });
    }
    // Retourner la réponse json
    return response.json({ message: "token OK" });
});


app.get('/login', (request, response) => {
 
    //Se connecter ( générer un token)
    const token = jwt.sign({email: "ou peut etre un pseudo"}, JWT_SECRET, {expiresIn : '3 hours'});

    // Retourner la réponse json
    return response.json({ token : token});
});
 
 
// Démarrer
// param 1 = le port ou on lance le serveur
// param 2 = Que faire quand le serveur à démarrer (afficher un log)
app.listen(3000, () => {
    console.log("Le serveur à demarré");
});
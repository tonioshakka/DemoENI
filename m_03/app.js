const calculatrice = require('./calculatrice');

//Stocker le resultat dans result
const result = calculatrice.add(10, 20);

//Afficher du texte formatté (Template String / Template Literals)
console.log(`Le résultat est : ${result}`);

const result2 = calculatrice.multiply(7915, 76546535);
console.log(`Le résultat de la multiplication est : ${result2}`)
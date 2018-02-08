const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.static('public'));

const transforme_en_tableau = (collection) => {
	let chaine = '<table>';
	chaine += '<thead><tr><th>Prénom</th><th>Nom</th><th>Téléphone</th><th>Courriel</th></thead>'
	collection.forEach((elm)=>{
		chaine += "<tr><td>" + elm.prenom + '</td><td>' + elm.nom + '</td><td>' + elm.telephone + '</td><td>' + elm.courriel + '</td></tr>';
	})
	chaine += '</table>'
	return chaine
}

app.get('/formulaire', function (req, res) {
 console.log(__dirname); //nom du domaine
 res.sendFile( __dirname + "/public/html/" + "01_form.htm" );
})

app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})

app.get('/traiter_get', function (req, res) {
	// Preparer l'output en format JSON
	console.log('la route /traiter_get')

	// on utilise l'objet req.query pour récupérer les données GET
	let reponse = {
		 prenom:req.query.prenom,
		 nom:req.query.nom,
		 telephone:req.query.telephone,
		 courriel:req.query.courriel
	 };
	console.log(reponse);
	res.end(JSON.stringify(reponse));

	fs.appendFile('public/membres.txt', ',' + JSON.stringify(reponse), function (err) {
		if (err) throw err;
		console.log('Sauvegardé');
	});
});

// Route : membres
app.get('/membres', (req, res) => {
	fs.readFile('public/membres.txt', 'utf8', function(err, data) {
		if (err) throw err;
		let collection = JSON.parse('[' + data + ']');
		res.end(transforme_en_tableau(collection))
	});
});

var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})
var express = require('express');
var bodyP = require('body-parser');
var cookieP = require('cookie-parser');
var twig = require("twig");
var mysql = require('mysql');
var db = mysql.createConnection({
    host : process.env.IP,  // pas touche à ça: spécifique pour C9!
    user : process.env.C9_USER.substr(0,16),  // laissez comme ça, ou mettez votre login à la place
    password : '',
    database : 'c9'  // mettez ici le nom de la base de données
});

// Création de l'application web
var app = express();

// Configuration des middlewares
app
    .use(bodyP.urlencoded({ extended: false }))
    .use(cookieP())
    .use(express.static('.'));

// Configuration des dossiers contenant les sources d'un template
app.set('views', 'templates');

/* Servir des fichiers */
app.use('/s', express.static('static'));
app.get('/signin', function(req,res) {
    res.sendFile(__dirname + '/static/form.html');
});

db.connect();

function User(login,pass,couleur1,couleur2,parties,gagnees) {
    this.login = login;
    this.pass = pass;
    this.couleur1 = couleur1;
    this.couleur2 = couleur2;
    this.parties = parties;
    this.gagnees = gagnees;
}

app.get('/userlist', function(req,res) {
    var userlist = [];
    
    db.query('SELECT * FROM users',
    // callback
    function(err, rows){
        if(err) {
            console.log("Erreur lors de l'exécution de la requête.");
        } else {
            var newUser = {};
            for (var i = 0, c=rows.length ; i < c ; i++) {
                newUser = new User(rows[i].login,rows[i].pass,rows[i].couleur1,rows[i].couleur2,rows[i].parties,rows[i].gagnees);
                userlist.push(newUser);
            }
        }
    });
    res.render('userlist.twig', {'userlist':userlist});
});

// db.end();

// On lance l'application
// (process.env.PORT est un paramètre fourni par Cloud9)
app.listen(process.env.PORT);
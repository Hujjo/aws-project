var express = require('express');
var bodyP = require('body-parser');
var cookieP = require('cookie-parser');
var twig = require("twig");
var mysql = require('mysql');
var db = mysql.createConnection({
    host : process.env.IP,  // pas touche à ça: spécifique pour C9!
    user : 'hujjo',
    password : '',
    database : 'projet'
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

// connexion explicite à la BD
//db.connect();
// constructeur User
function User(login,pass) {
    this.login = login;
    this.pass = pass;
}
// constructeur Message
function Message(id,text,datetime,x,y,user) {
    this.id = id;
    this.text = text;
    this.datetime = datetime;
    this.x = x;
    this.y = y;
    this.user = user;
}

app.get('/', function(req, res) {
    /* Page principale :
        - affichage des post-it,
        - lien de connexion / déconnexion / inscription.
    */
    var messagelist = [];
    db.query('SELECT * FROM message',
    // callback
    function(err, rows){
        if(err) {
            console.log("Erreur lors de l'exécution de la requête : SELECT MESSAGE.");
            console.log(err);
        } else {
            console.log("Requête exécutée avec succès!");
            var newMessage = {};
            for (var i = 0, c=rows.length ; i < c ; i++) {
                newMessage = new Message(rows[i].id,rows[i].text,rows[i].datetime,rows[i].x,rows[i].y,rows[i].user);
                messagelist.push(newMessage);
            }
        }
    });
    res.render('main.twig', {'messagelist':messagelist});
});

app.get('/signup', function(req, res) {
    /* Page gérant l'inscription d'un nouvel utilisateur. */
    res.render('signup.twig');
});
app.post('/signup', function(req,res) {
    var userData1 = req.body.login;
    var userData2 = req.body.pass;
    var preparedStatement = 'INSERT INTO user(login,pass) VALUES ('+db.escape(userData1)+','+db.escape(userData2)+');';
    console.log(preparedStatement);
    db.query(preparedStatement, function(err, result) {
        if(err)
            console.log("Erreur lors de l'exécution de la requête : INSERT USER.");
        else {
            console.log("Exécution de la requête réussie!");
            res.redirect('/');  // pb : redirige sur la page d'accueil mais l'affichage ne s'exécute pas...
        }
    });
    
});

app.get('/login', function(req, res) {
    /*  Page gérant la connexion d'un utilisateur.
        Redirige vers '/' si réussite.
    */
    res.render('login.twig');
});
app.post('/login', function(req, res) {
    
});

app.get('/logout', function(req, res) {
    /* Page gérant la déconnexion d'un utilisateur.
        Redirige vers '/' si réussite.
    */
});

app.get('/ajouter', function(req, res) {
    /* Page gérant l'ajout d'un nouveau post-it.
        Redirige vers '/' si réussite.
    */
});

app.get('/effacer', function(req, res) {
    /* Page gérant la suppression d'un post-it existant.
        Redirige vers '/' si réussite.
    */
});

// On lance l'application
// (process.env.PORT est un paramètre fourni par Cloud9)
app.listen(process.env.PORT);
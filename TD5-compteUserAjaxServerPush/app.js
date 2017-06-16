var express = require('express');
var bodyP   = require('body-parser');
var cookieP = require('cookie-parser');
var twig    = require("twig");
var session = require('express-session');

// config database
var mysql   = require('mysql');
var db      = mysql.createConnection({
    host        : process.env.IP,  // pas touche à ça: spécifique pour C9!
    user        : process.env.C9_USER.substr(0,16),  // laissez comme ça, ou mettez votre login à la place
    password    : '',
    database    : 'c9'  // mettez ici le nom de la base de données
});

// Création de l'application web
var app = express();

// Configuration des middlewares
app
    .use(bodyP.urlencoded({ extended: false }))
    .use(cookieP())
    .use(express.static('.'))
    .use(session({
        secret: '12345',
        resave: false,
        saveUninitialized: false,
}));

// Configuration des dossiers contenant les sources d'un template
app.set('views', 'templates');

/* Servir des fichiers */
app.use('/s', express.static('static'));
app.get('/signin', function(req,res) {
    res.sendFile(__dirname + '/static/form.html');
});

db.connect();

// Variables globales
var connectes = {};

// Constructeurs et autres fonctions
function User(login,pass,couleur1,couleur2,parties,gagnees) {
    this.login = login;
    this.pass = pass;
    this.couleur1 = couleur1;
    this.couleur2 = couleur2;
    this.parties = parties;
    this.gagnees = gagnees;
}

// PARTIE 2 - affichage des utilisateurs
app.get('/userlist', function(req,res) {
    //console.log(req.session.login)
    if(req.session.login == null){
        console.log('DEBUG: GET /userlist \tnoone\tauthentificate')
        res.redirect('/');
    }else {
        console.log('DEBUG: GET /userlist \t'+req.session.login+'\tauthentificate');
        var userlist = [];
        
        db.query('SELECT * FROM users',
        // callback
        function(err, rows){
            //console.log('gestion requete');
            if(err) {
                console.log("Erreur lors de l'exécution de la requête.");
            } else {
                var newUser = {};
                for (var i = 0, c=rows.length ; i < c ; i++) {
                    newUser = new User(rows[i].login,rows[i].pass,rows[i].couleur1,rows[i].couleur2,rows[i].parties,rows[i].gagnees);
            // PARTIE 5
                    if (newUser.login in connectes)
            // FIN PARTIE 5
                        userlist.push(newUser);
                    //console.log(rows[i]);
                }
                res.render('userlist.twig', {'userlist':userlist});
            }
        });
    }
});

// PARTIE 3 - inscription
app.all('/signup', function(req, res) {
    switch (req.method) {
        case 'GET':
            res.render('signup.twig');
            break;
        case 'POST':
            //console.log(req.body);
            if(req.body['login'] !== '' && req.body['pass'] !== '')
            {
                //console.log(req.body['pass'] + '\n' + typeof(req.body['pass']))
                var color;
                if (req.body['color'] === '')
                    color = 'brown';
                else
                    color = req.body['color'];
                console.log("DEBUG: POST /signup formulaire OK");
                db.query('INSERT INTO users(login,pass,couleur1,parties,gagnees)' 
                        +'VALUES(?,?,?,0,0)', [ req.body['login'], req.body['pass'], color ],
                        function(err, result) {
                            console.log('gestion requete');
                            if(err === null) {       // successfull
                                //console.log(result);
                                res.redirect('/userlist');
                            }
                            else {                    // fail
                                //console.log(err);
                                res.render('signup.twig', {'error':err});
                            }
                        }
                );
            } else {
                console.log('DEBUG: POST /signup formulaire KO')
                var err = "Error: mdp and login require";
                res.render('signup.twig', {'error':err});
            }
            break;
        default:
            // code
            break;
    }
})

// PARTIE 4 - connexion
app.all('/', function(req, res) {
    switch(req.method){
        case 'GET':
            res.render('login.twig');
            break;
        case 'POST':
            //console.log(req.body);
            if(req.body['login'] !== '' && req.body['pass'] !== '')
            {
                console.log("DEBUG: POST / formulaire OK");
                console.log(req.body['login']+' want to connect himself to servor');
                db.query('SELECT login, couleur1, couleur2, parties, gagnees FROM users WHERE login=? AND pass=?', 
                        [ req.body['login'], req.body['pass'] ],
                        function(err, rows) {
                            //console.log('gestion requete');
                             if(err) {
                                console.log("Erreur lors de l'exécution de la requête.");
                            } else {
                                //console.log(typeof(rows) + '\t' + rows + '\n' + typeof(rows[0]) + '\t' + rows[0]);
                                if (typeof(rows[0]) !== 'undefined') {
                                    console.log("Exist!");
                                    //console.log(rows[0]+'\t'+rows[0].login+'\t'+rows.login)
                                    req.session.login = rows[0].login;
                                    req.session.couleur1 = rows[0].couleur1;
                                    req.session.couleur2 = rows[0].couleur2;
                                    req.session.parties = rows[0].parties;
                                    req.session.gagnees = rows[0].gagnees;
    // PARTIE 5
                                    connectes[req.session.login] = { time: new Date() };
    // FIN PARTIE 5
                                    console.log(req.session.login + '\t' + 'authentificate!')
                                    res.redirect('/userlist');
                                } else {
                                    console.log("Don't exist!");
                                    var err = -8;   //"Error: mdp and login false";
                                    res.render('login.twig', {'error':err});
                                }
                            }
                        }
                    );
            }
            break;
        default:
            //code
            break;
    }
})

app.get('/logout', function(req, res) {
    // PARTIE 5
    delete connectes[req.session.login];// on enlève le connecté de la liste
    // FIN PARTIE 5
    req.session.login = null;           // on supprime le login pour déconnecter
    res.redirect('/');                  // on redirige sur /
})

// PARTIE 6 - maj userlist avec AJAX
app.get('/api/fruits', function(req, res) {
  var data = { fruits: ['banana', 'apple'],
               how_many: 2,
               random_stuff: Math.random()
             };
  res.json(data);
});
app.get('/api/userlist', function(req, res) {
  res.json(connectes);
});

// db.end();

// On lance l'application
// (process.env.PORT est un paramètre fourni par Cloud9)
app.listen(process.env.PORT);
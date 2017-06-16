// Chargement ramework et Middlewares
var express = require('express');
var bodyP = require('body-parser');
var cookieP = require('cookie-parser');
var twig = require("twig");

// Création de l'application web
var app = express();

// Configuration des middlewares
app
    .use(bodyP.urlencoded({ extended: false }))
    .use(cookieP())
    .use(express.static('.'));

/* PARTIE 1 : Template Twig */
// Configuration des dossiers contenant les sources d'un template
app.set('views', 'templates');
app.set("twig options", { autoescape: true });

// PARTIE 1 : Servir des fichiers
// QUESTION 3
app.use('/s', express.static('static'));
// QUESTION 4
app.get('/signin', function(req,res) {
    res.sendFile(__dirname + '/static/form.html');
});

/*
app.get('/hello',function(req, res) {
// QUESTION 5
    //res.sendFile(__dirname + '/hello.html');

// PARTIE 1 : Template Twig
    // question 2 (nom, nombres) et 3 (color, element)
    console.log(req.params);
    console.log(req.query);
    res.render('hello.twig', { 'nom' : req.query.nom, 
        'nombres' : {
            'One' : 'Un',
            'Two' : 'Deux',
            'Three' : 'Trois'
        }, 
        'color' : req.query.color, 
        'element' : {
            red : ['cerise','fraise','sang'],
            yellow : ['soleil','citron','banane']
        }
    });
});
*/

/*
// PARTIE 2 : Persistance - Query String
// QUESTION 1 et 2
app.get('/bye',function(req, res) {
    console.log(req.params);
    console.log(req.query);
    res.render('bye.twig', { 'nom' : req.query.nom});
})

// PARTIE 2 : Persistance - Champs cachés
// QUESTION 2
app.post('/hello',function(req, res) {
    console.log(req.body);
    
    res.render('hello.twig', { 'nom' : req.body.nom, 'color' : req.body.color, 'element' : {
        red : ['cerise','fraise','sang'],
        yellow : ['soleil','citron','banane']
    } });
})

// QUESTION 4
app.post('/bye',function(req, res) {
    console.log(req.body);
    
    res.render('bye.twig', { 'nom' : req.body.nom });
})
*/

/*
// PARTIE 2 : Persistance - URL
// QUESTION 1
app.get('/:nom/compteur', function(req, res) {
    console.log(req.query);
    console.log(req.params);
    
// QUESTION 3
    res.redirect('/'+req.params.nom+'/compteur/0');
})

// QUESTION 2
app.get('/:nom/compteur/:cnt', function(req, res) {
    console.log(req.query);
    console.log(req.params);
    
// QUESTION 3
    var cpt = parseInt(req.params.cnt);
    cpt++;
    console.log(cpt);
    
    res.render('pers_url.twig', { 'nom' : req.params.nom, 'cnt' : cpt });
    
// QUESTION 5
    // mettre 999999 dans l'URL comme valeur du compteur
})
*/

// PARTIE 3 : Cookies
// QUESTION 1
app.get('/compteur-cookie', function(req, res) {
    if(req.cookies.cpt == undefined)
        res.cookie('cpt', '1');
    else {
        var tmp = parseInt(req.cookies.cpt);
        tmp++;
        res.cookie('cpt', tmp);
    }
    res.render('cookie.twig', { 'cpt' : req.cookies.cpt });
})

// PARTIE 3 : Storage API
// QUESTION 1
app.get('/storage-api', function(req, res) {
    res.render('storage_api.twig');
})

// On lance l'application
// (process.env.PORT est un paramètre fourni par Cloud9)
app.listen(process.env.PORT);

// Chargement du Framwork Express
var express = require('express');
var bodyP = require('body-parser');
var cookieP = require('cookie-parser');
// ...et le moteur de templating Twig
//var twig = require("twig");

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

app.get('/hello',function(req, res) {
/* Servir des fichiers */
    // question 5
    //res.sendFile(__dirname + '/hello.html');

    console.log(req.params);
    console.log(req.query);
  
/* Template Twig */
    // question 2 (nom) et 3 (color, element)
    res.render('hello.twig', { 'nom' : req.query.nom, 'color' : req.query.color, 'element' : {
        red : ['cerise','fraise','sang'],
        yellow : ['soleil','citron','banane']
    } });
        
});

/* Persistance - Query String */
    // question 1 et 2
app.get('/bye',function(req, res) {
    console.log(req.params);
    console.log(req.query);
    res.render('bye.twig', { 'nom' : req.query.nom});
})

/* Persistance - Champs cachés */
    // question 2
app.post('/hello',function(req, res) {
    console.log(req.body);
    
    res.render('hello.twig', { 'nom' : req.body.nom, 'color' : req.body.color, 'element' : {
        red : ['cerise','fraise','sang'],
        yellow : ['soleil','citron','banane']
    } });
})

    // question 4
app.post('/bye',function(req, res) {
    console.log(req.body);
    
    res.render('bye.twig', { 'nom' : req.body.nom });
})

/* Persistance - URL */
    // question 1
app.get('/:nom/compteur', function(req, res) {
    console.log(req.query);
    console.log(req.params);
    
    // question 3
    res.redirect('/'+req.params.nom+'/compteur/0');
})

    // question 2
app.get('/:nom/compteur/:cnt', function(req, res) {
    console.log(req.query);
    console.log(req.params);
    
    // question 3
    var cpt = parseInt(req.params.cnt);
    cpt++;
    console.log(cpt);
    
    res.render('pers_url.twig', { 'nom' : req.params.nom, 'cnt' : cpt });
})

/* Cookies */
    // question 1
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

/* Storage API */
    // question 1
app.get('/storage-api', function(req, res) {
    res.render('storage_api.twig');
})

// On lance l'application
// (process.env.PORT est un paramètre fourni par Cloud9)
app.listen(process.env.PORT);

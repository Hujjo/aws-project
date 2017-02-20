var express = require('express');
var bodyP = require('body-parser');
var cookieP = require('cookie-parser');

var app = express();

// Configuration des middlewares
app
    .use(bodyP.urlencoded({ extended: false }))
    .use(cookieP())
    .use(express.static('.'));

/* Question 1 */
/*
app.get('/query_string', function(req, res) {
    res.send('Hello <br />world!');
});*/

/* Question 2 */
/*
var jours = {   'mon' : 'Lundi',
                'tue' : 'Mardi',
                'wed' : 'Mercredi',
                'thu' : 'Jeudi',
                'fri' : 'Vendredi',
                'sat' : 'Samedi',
                'sun' : 'Dimanche' };

var s = '';
                
for (var j in jours) {
    s += j+' : '+jours[j]; // s += jours[j]; pour n'afficher que les valeurs
    s += '<br />';
}

app.get('/', function(req, res) {
    res.send(s);
});*/

/* Question 3 */
/*
app.get('/:n', function(req, res) {
    var s = '';
    
    if(req.params.n == 'query_string') {   
    for (var j in req.query) {
        s += j+' : '+req.query[j];
        s += '<br />';
    }
    }
    else {
        s = 'raté !';
    }
    res.send(s);
});*/

/* Question 4 */
/*
app.get('/:n', function(req, res) {
    var s = '';
    
    if(req.params.n == 'query_string') {   
    for (var j in req.query) {
        s += j+' : '+req.query[j];
        s += '<br />';
    }
    
    s += '<br /><br />'+req._parsedUrl.query;
    }
    else {
        s = 'raté !';
    }
    res.send(s);
});*/

/* Question 6 */
/*
app.post('/form_data', function(req, res) {
    var s = '';
 
    for (var j in req.body) {
        s += j+' : '+req.body[j];
        s += '<br />';
    }
    
    //s += '<br /><br />';

    res.send(s);
});*/

/* Question 7 */
/*
app.get('/headers', function(req, res) {
    var s = '';
    
    s += 'HEADER DE LA REQUETE<br /><br />';
    for (var j in req.headers) {
        s += j+' : '+req.headers[j];
        s += '<br />';
    }
    s += '<br /><br />'; 
    s += 'COOKIES DE LA REQUETE<br /><br />'; 
    for (var j in req.cookie) {
        s += j+' : '+req.cookie[j];
        s += '<br />';
    }
  
    res.send(s);
});*/

/* Question 8 */
/**/
app.all('/', function(req, res) {
    var s = '';
    
    s += 'GET DE LA REQUETE<br /><br />';
    for (var j in req.query) {
        s += j+' : '+req.query[j];
        s += '<br />';
    }
    s += '<br />'; 
    s += 'POST DE LA REQUETE<br /><br />';
    for (var j in req.body) {
        s += j+' : '+req.body[j];
        s += '<br />';
    }
    s += '<br />'; 
    s += 'HEADER DE LA REQUETE<br /><br />';
    for (var j in req.headers) {
        s += j+' : '+req.headers[j];
        s += '<br />';
    }
    s += '<br />'; 
    s += 'COOKIES DE LA REQUETE<br /><br />'; 
    for (var j in req.cookie) {
        s += j+' : '+req.cookie[j];
        s += '<br />';
    }
    res.send(s);
});

app.listen(8080);
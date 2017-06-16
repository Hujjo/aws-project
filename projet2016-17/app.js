var express = require('express');
var bodyP   = require('body-parser');
var cookieP = require('cookie-parser');
var twig    = require("twig");
var session = require('express-session');

// var bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

// config database
var mysql   = require('mysql');
var db      = mysql.createConnection({
    host        : process.env.IP,
    user        : process.env.C9_USER.substr(0,16),
    password    : '',
    database    : 'project'  // database name
});

// Creating web app
var app = express();

// Settings of middlewares
app
    .use(bodyP.urlencoded({ extended: false }))
    .use(cookieP())
    .use(express.static('.'))
    .use(session({
        secret: '12345',
        resave: false,
        saveUninitialized: false,
}));

// Settings of directory with templates files
app.set('views', 'templates');
app.set("twig options", { autoescape: true });

// Connect to the database
db.connect();

// Global Variable
var loginUsers = {};

// Constants

// Constructors and others functions
function User(id,username,password,color) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.color = color;
}

/*  Route /
 *  Display log in form or sign up link or calendar
 *  
 */
app.get('/', function(req, res) {
    console.log('DEBUG: /');
    console.log('DEBUG: / loginUsers : '+loginUsers[0]);
    console.log('SESSION: / '+req.session.username);
    var session;
    if(req.session.username != null){
        session = req.session;
    } else {
        session = null;
    }
    res.render('main.twig', {   'error'     : false,
                                'session'   : session});
})

/*  Route /signup
 *  GET method : display sign up form
 *  POST method : treate new user creating request
 */
app.all('/signup', function(req, res) {
    console.log('DEBUG: /signup');
    console.log('DEBUG: /signup loginUsers : '+loginUsers[0]);
    console.log('SESSION: /signup '+req.session.username);
    if(req.session.username == null){
        if (req.method== 'POST') {
            console.log('DEBUG: /signup POST');
            var username = req.body.username;
            var password = req.body.pass;
            var c = req.body.color;
            // bcrypt.genSalt(saltRounds, function(err, salt) {
            // bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            //     // Store hash in your password DB. 
            if (username && password) {
                console.log('DEBUG: /signup POST form ok');
                db.query('INSERT INTO user(username,password,color) VALUES (?,?,?)',
                         [username, password, c], function(err, result) {
                    if (err && err.errno == 1062) {
                        res.render('signup.twig', { 'error'  : 'Username already used.' });
                    } else if (err || result.affectedRows != 1) {
                        console.log('LOG: /signup POST form ok ERR: '+err);
                        console.log('DEBUG: /signup POST form ok ERR RESULT: '+result);
                        res.status(500).send('SQL error');
                    } else {
                        req.session.username = username;
                        req.session.color = c;
                        // Add user to loginUsers
                        loginUsers[req.session.username] = { time: new Date() };
                        // Redirect to main page
                        res.redirect('/');
                    }
                });
            } else {
                console.log('DEBUG: /signup POST form out');
                res.render('signup.twig', { 'error'  : 'Username or password empty.' });
            }
        //     });
        // });
        } else {
            console.log('DEBUG: /signup GET');
            res.render('signup.twig', { 'error' : false });
        }
    } else {            // if user is already connected
        console.log('DEBUG: /userlist \t'+req.session.username+'\talready\tauthentificate')
        res.redirect('/');
    } 
});

/*  Route /signin
 *  GET method  : display sign in form
 *  POST method : treate sign in request
 *      if success  : connect the user and redirect to /
 *      if fail     : rend signin template with error
 */
app.all('/signin', function(req, res) {
    console.log('DEBUG: /signin');
    console.log('DEBUG: /signin loginUsers : '+loginUsers[0]);
    console.log('SESSION: /signin '+req.session.username);
    if(req.session.username == null){
        if(req.method == 'POST'){
            var username = req.body.username;
            var password = req.body.pass;
// // Load hash from your password DB. 
// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res == true 
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
//     // res == false 
// });
            if(username && password)
            {
                console.log('DEBUG: /signin POST form OK');
                console.log('LOG: '+username+' want to connect himself to servor.');
                db.query('SELECT username, color FROM user WHERE username=? AND password=?', 
                    [ username, password ], function(err, rows) {
                        if (err) {
                            console.log(err, rows);
                            res.status(500).send('SQL error');
                        } else {
                            console.log(username + '\t' + 'exists.');
                            // Create session
                            req.session.username = rows[0].username;
                            req.session.color = rows[0].color;
                            // Add user to loginUsers
                            loginUsers[req.session.username] = { time: new Date() };
                            // Redirect to main page
                            res.redirect('/');
                        }
                    }
                );
            } else {    // Form error
                res.render('signin.twig', { 'error'  : 'Username or password empty.' });
            }
        } else {        // GET method
            res.render('signin.twig', { 'error' : false });
        }
    } else {            // if user is already connected
        console.log('DEBUG: /userlist \t'+req.session.username+'\talready\tauthentificate')
        res.redirect('/');
    } 
})

/*  Route /logout
 *  GET method : disconnect user then redirect to /
 */
app.get('/logout', function(req, res) {
    console.log('DEBUG: /logout');
    console.log('DEBUG: /logout loginUsers : '+loginUsers[req.session.username]);
    console.log('SESSION: /logout '+req.session.username);
    delete loginUsers[req.session.id];
    req.session.destroy(function(err){
        if(!err)
            res.redirect('/');
    })
})

/* Route /choices
 * GET method : return choices from current month
 */
app.get('/choices/:ye/:mo', function(req, res) {
    console.log('DEBUG: /choices');
    console.log('DEBUG: /choices loginUsers : '+loginUsers[req.session.username]);
    console.log('SESSION: /choices '+req.session.username);
    var m = req.params.mo;
    var y = req.params.ye;
    db.query('SELECT c.id_user, c.dateChoice, u.username, u.color '+
                'FROM choice c, user u '+
                'WHERE c.id_user = u.id_user '+
                'AND MONTH(c.dateChoice)=? '+
                'AND YEAR(c.dateChoice)=? ' +
                'ORDER BY c.dateChoice', [ m, y ] ,
        function(err, rows) {
            if (err) {
                console.log('LOG: /choices GET ERR: '+err);
                console.log('DEBUG: /choices GET ERR ROWS: '+rows);
                res.render('main.twig', { 'error' : 'Unable to reach choices.' })
            } else {
                res.json(rows);
            }
    })
})

/* Route /add
 * GET method : add a new choice to current month
 */
app.get('/add/:id/:year/:month/:day', function(req, res) {
    console.log('SESSION: /add '+req.session.username);
    if(req.session.username == null){
        console.log('LOG: /add GET attempt to add whithout valid connection');
        res.send('GET request receive but no valid connection');
    } else {
        var pId = req.params.id;
        var pDate = new Date(req.params.year,req.params.month-1,req.params.day);
        db.query('SELECT id_user FROM user WHERE username=?', [pId], function(err, rows) {
            if(err) {
                console.log('LOG: /add GET 1 ERR: '+err);
                // console.log('DEBUG: /add GET 1 ERR ROWS: '+rows);
                res.render('main.twig', { 'error' : 'Unable to select user.' });
            } else if (rows.length != 1) {
                console.log('LOG: /add GET 2 ERR: '+err);
                // console.log('DEBUG: /add GET 2 ERR ROWS: '+rows);
                res.status(500).send('SQL error');
            } else {
                var idCur = rows[0].id_user;
                console.log('SELECT id_user FROM user WHERE username='+pId);
                db.query('INSERT INTO choice(id_user,dateChoice) VALUES(?,?)',
                [idCur, pDate], function(err, rows) {
                    if(err){
                        console.log('LOG: /add GET 3 ERR: '+err);
                        console.log('DEBUG: /add GET 3 ERR ROWS: '+rows);
                        res.render('main.twig', { 'error' : 'Unable to add choice.' })
                    }else{
                        console.log('INSERT INTO choice(id_user,dateChoice) '+
                            'VALUES('+idCur+','+pDate+')');
                        res.send('GET request receive. Choice add.');
                    }
                });
            }
        });
        
    }
})

/* Route /delete
 *
 */
app.get('/delete/:id/:year/:month/:day', function(req, res) {
    console.log('SESSION: /delete '+req.session.username);
    if(req.session.username == null){
        console.log('LOG: /delete GET attempt to delete whithout valid connection');
        res.send('GET request receive but no valid connection');
    } else {
        var pId = req.params.id;
        var pDate = new Date(req.params.year,req.params.month-1,req.params.day);
        db.query('SELECT id_user FROM user WHERE username=?', [pId], function(err, rows) {
            if(err) {
                console.log('LOG: /delete GET 1 ERR: '+err);
                // console.log('DEBUG: /delete GET 1 ERR ROWS: '+rows);
                res.render('main.twig', { 'error' : 'Unable to select user.' });
            } else if (rows.length != 1) {
                console.log('LOG: /delete GET 2 ERR: '+err);
                // console.log('DEBUG: /delete GET 2 ERR ROWS: '+rows);
                res.status(500).send('SQL error');
            } else {
                var idCur = rows[0].id_user;
                console.log('SELECT id_user FROM user WHERE username='+pId);
                db.query('DELETE FROM choice WHERE id_user=? AND dateChoice=?',
                    [idCur, pDate], function(err, rows) {
                        if(err){
                            console.log('LOG: /delete GET 3 ERR: '+err);
                            console.log('DEBUG: /delete GET 3 ERR ROWS: '+rows);
                            res.render('main.twig', { 'error' : 'Unable to delete choice.' })
                        } else {
                        console.log('DELETE FROM choice WHERE id_user='+idCur+' AND dateChoice='+pDate);
                            res.send('GET request receive. Choice delete.');
                        }
                });
            }
        });
    }
});

// db.end();

// On lance l'application
// (process.env.PORT est un paramètre fourni par Cloud9)
app.listen(process.env.PORT);
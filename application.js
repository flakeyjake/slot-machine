var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');

server.listen(8080);

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'slotmachine_db'
});

connection.connect();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/game.html', __dirname + '/register.html');
});

app.post('/createuser', function(req, res) {
    var newUser = {
        username: req.body.username,
        password: req.body.password
    }

    connection.query('insert into users (username, password, tokens) values ("' + newUser.username + '", "' + newUser.password + '", "50")', function(err, result) {
        if (err)
            console.error(err);
        else {
            console.log('Created user ' + req.body.username + ' with password ' + req.body.password);

        }
    });
});
app.post('/login', function(req, res) {
    var newUser = {
        username: req.body.username,
        password: req.body.password
    }

    connection.query('select password from users where username = "' + newUser.username + '"', function(err, result) {
        if (result[0].password != newUser.password) {
            res.end('Incorrect username or password');
        }
        if (err) {
            console.error(err);
        }
        else {
            res.send(newUser.username);


        }
    });
});

app.post('/addTokens', function(req, res) {
    var username = req.body.username;
    var amount = req.body.amount;
    
    connection.query('update users set tokens = tokens + "' + amount + '" where username = "' + username + '"', function(err, result) {
        if (err)
            console.error(err);
        else
            res.send('Congrats, ' + username + '! You just won ' + amount + ' tokens!');
    });
});

app.post('/getTokens', function(req, res) {
    connection.query('select tokens from users where username = "' + req.body.username + '"', function(err, rows, fields) {
        if (err)
            console.error(err)
        else {
            res.send(rows[0].tokens.toString());
        }
    });
});

app.post('/removeTokens', function(req, res){
    var username = req.body.username;
    var amount = req.body.amount;
    
    connection.query('update users set tokens = tokens - "' + amount + '" where username = "' + username + '"', function(err, result){
        if (err){
            console.error(err);
        }
    });
});
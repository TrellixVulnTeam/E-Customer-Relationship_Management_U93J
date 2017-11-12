var http=require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);

app.use(express.static('views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var path = __dirname + '/views/';
var routes = require('./server/routes')(app);
var productroutes = require('./server/Product-Server')(app);
var configDB = require('./server/config');

var port = process.env.PORT || 8080;
http.listen(port);

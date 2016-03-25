var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var mongoose = require('mongoose');
var q = require('q');
var amazon = require('./api/controllers/amazonCtrl.js');

var app = express();
app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb://localhost/compare');
mongoose.connection.once('open', function() {
    console.log("Connected to MongoDB");
});
app.use(express.static(__dirname + '/public'));


app.get('/api/compare', amazon.getProducts);




app.listen('9000', function() {
    console.log('Listening to port 9000');
});

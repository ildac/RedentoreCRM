/**
 * Created by Dac on 18/10/14.
 */

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// load the routes
var defaultRoutes = require('./routes/index');
var courseRoutes = require('./routes/course');

// server config TODO spostami in config file
mongoose.connect('mongodb://localhost:27017/redentoreCRM');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// default listening port for the server TODO spostami in config file
var port = process.env.PORT || 8000;

// register the routes
app.use('/api/v1', defaultRoutes);
app.use('/api/v1', courseRoutes);

// run the server
app.listen(port);
console.log('Running on port: ' + port);
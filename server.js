/**
 * Created by Dac on 18/10/14.
 */

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var configDebug = require('./config-debug');

// load the routes
var indexRoutes = require('./routes/index');
var courseRoutes = require('./routes/course');
var userRoutes = require('./routes/user');

// server config
mongoose.connect(configDebug.db.mongodb);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// default listening port for the server TODO spostami in config file
var port = process.env.PORT || 8000;

// register the routes
app.use('/api/v1', indexRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/users', userRoutes);

// run the server
app.listen(port);
console.log('Running on port: ' + port);

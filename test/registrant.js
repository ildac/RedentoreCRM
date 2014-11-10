/**
 * Created by Dac on 10/11/14.
 */

var should = require('should-http');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config-debug');

var User = require('../models/user');
var Course = require('../models/course');
var Edition = require('../models/courseEdition');


describe('Routing for register a user to a course edition', function () {
    var url = 'http://localhost:8000/api/v1';
    var userId;
    var courseId;
    var editionId;

    // Setup the scenario, create a user a course and a course edition
    before(function (done) {
        mongoose.connect(config.db.mongodb);




        done();
    });


    // Scenario cleanup, delete edition, course and user. Disconnect from DB
    after(function (done) {


        mongoose.disconnect();
        done();
    });

});


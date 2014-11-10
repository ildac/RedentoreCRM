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
var Registrant = require('../models/registrant');


describe('Routing for course edition registration', function () {
    var url = 'http://localhost:8000/api/v1';
    var userId;
    var courseId;
    var editionId;

    // Setup the scenario, create a user a course and a course edition
    before(function (done) {
        mongoose.connect(config.db.mongodb);

        // TODO setup!

        done();
    });

    it('should register the user', function (done) {

    });

    it('should return "true" if the user is registered "false" otherwise', function (done) {

    });

    it('should return the list of all the user registered', function (done) {

    });

    it('should change the status of the registration to confirmed', function (done) {

    });

    it('should delete the user registration', function (done) {

    });

    // Scenario cleanup, delete edition, course and user. Disconnect from DB
    after(function (done) {

        //TODO cleanup!

        mongoose.disconnect();
        done();
    });

});


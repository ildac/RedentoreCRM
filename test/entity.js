/**
 * Created by Dac on 27/10/14.
 */
var should = require('should-http');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config-debug');

var Course = require('../models/course');

describe('Routing for', function () {
    var url = 'http://localhost:8000/api/v1';

    before(function (done) {
        mongoose.connect(config.db.mongodb);
        done();
    });



});

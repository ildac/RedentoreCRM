/**
 * Created by Dac on 27/10/14.
 */

var should = require('should-http');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config-debug');

//require('should-http');

describe('Routing', function () {
    var url = 'http://localhost:8000/api/v1';

    before(function (done) {
        mongoose.connect(config.db.mongodb);
        done();
    });

    describe('Course', function () {
        it('should insert a new course ', function (done) {
            var course = {
                name: 'MochaTest',
                description: 'mochaTest Course!'
            };

            request(url)
                .post('/courses')
                .send(course)
                .end(function(err, res) {
                    if(err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    done();
                });
        });

    })
})
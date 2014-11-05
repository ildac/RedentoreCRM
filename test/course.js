/**
 * Created by Dac on 27/10/14.
 */

var should = require('should-http');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config-debug');

var Course = require('../models/course');

describe('Routing for Course resource', function () {
    var url = 'http://localhost:8000/api/v1';

    before(function (done) {
        mongoose.connect(config.db.mongodb);
        done();
    });


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

    //TODO fix duplicated value
    xit('should return an error if it is a duplicate course name', function (done) {
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
                res.should.have.status(400);
                done();
            });
    });

    it('should update a given record', function (done) {
        var updatedCourse = {
            name: 'MochaTestUpdated',
            description: 'mochatest Course, after the update'
        };

        Course.findOne({name: 'MochaTest'}, function(err, course) {
            if (err) {
                console.log(error);
                throw err;
            }

            request(url)
                .put('/courses/' + course._id )
                .send(updatedCourse)
                .end(function(err, res){
                    if(err) {
                        throw err;
                    }
                    res.body.message.should.equal('updated');
                    res.body.data.should.have.property('_id');
                    res.body.data.name.should.equal(updatedCourse.name);
                    res.body.data.description.should.equal(updatedCourse.description);
                    done();
                });
        });
    });

    it('should delete a specific documents', function (done) {
        Course.findOne({ name: 'MochaTestUpdated' }, function (err, course) {
            if (err) {
                throw err;
            }

            request(url)
                .delete('/courses/' + course._id)
                .send()
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.message.should.equal('deleted');
                    res.body.data._id.should.equal(course._id.toString());
                    res.body.data.name.should.equal('MochaTestUpdated'); //TODO Jsonify me...or not
                    done();
                });
        });
    });

    after(function (done) {
        mongoose.disconnect();
        done();
    });
});
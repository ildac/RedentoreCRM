/**
 * Created by Dac on 05/11/14.
 */

var should = require('should-http');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var moment = require('moment');

var config = require('../config-debug');

var Course = require('../models/course');
var Edition = require('../models/courseEdition');

describe('Routing for Edition resource', function () {
    var url = 'http://localhost:8000/api/v1';

    var courseId;
    var editionId;

    before(function (done) {
        mongoose.connect(config.db.mongodb);
        done();
    });


    it('should insert a new course edition', function (done) {
        var newEdition = {
            year: "2000/12",
            startingDate: "2014-09-01T00:00:00.000Z",
            endingDate: "2015-06-30T00:00:00.000Z"
        };

        Course.findById('545a1fbe28e97f737725a8ec', function (err, course) {
            if (err) {
                throw err;
            }

            courseId = course._id;

            request(url)
                .post('/courses/' + courseId + '/editions')
                .send(newEdition)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.should.have.status(200);
                    Course.findById(courseId, function (err, course) {
                        myEdition = course.editions.filter(function (edition) {
                            return (edition.year === newEdition.year);
                        });
                        editionId = myEdition[0]._id;
                    });
                    done();
                });
        });
    });

    xit('should retrieve a specific course edition', function (done) {

    });

    it('should update a certain edition', function (done) {
        var updatedEdition = {
            year: '2025/28',
            startingDate: '2016-09-01T00:00:00.000Z',
            endingDate: '2017-06-30T00:00:00.000Z'
        };

        request(url)
            .put('/courses/' + courseId + '/editions/' + editionId)
            .send(updatedEdition)
            .end(function(err, res){
                if(err) {
                    throw err;
                }
                res.body.message.should.equal('updated');
                res.body.numberOfUpdatedDocs.should.equal(1);
                done();
        });
    });

    it('should delete a specific edition', function (done) {
        request(url)
            .delete('/courses/' + courseId + '/editions/' + editionId)
            .send()
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.body.message.should.equal('deleted');
                //res.body.data._id.should.equal(editionId);
                done();
        });
    });

    //TODO test for getall
    //TODO test for get specific


});

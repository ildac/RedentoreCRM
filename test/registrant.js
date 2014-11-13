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

    var basePath;

    // Setup the scenario, create a user a course and a course edition
    before(function (done) {
        mongoose.connect(config.db.mongodb);

        // Setup:
        //  - create the user and insert it into the DB
        //  - create the course and the edition and insert them into the DB
        //  - get all the IDs

        var userVal = {
            cardNumber: '00000002',
            emails: {
                email: 'anne@bob.fake'
            },
            password: 'test',
            personalData: {
                name: 'Anne',
                surname: 'Bob',
                dateOfBirth: new Date().toISOString(),
                cityOfBirth: 'Paris',
                provinceOfBirth: 'Paris',
                address: {
                    street: 'Tour Eiffel',
                    number: '10',
                    city: 'Paris',
                    province: 'Paris',
                    CAP: '75001'
                },
                baptizedInParish: 'Notre Dam'
            },
            phones: [{
                number: '045871928392',
                name: 'Reception'
            }],
            scuola: {
                year: '1990',
                name: 'One School oround there',
                class: 'First one',
                section: 'C'
            },
            note: {
                text: 'I\'m Red',
                date: new Date('2014', '5', '20')
            }
        };
        var courseVal = {
            name: 'Test Edition',
            description: 'mochaTest Course!'
        };
        var editionVal = {
            year: "2000/12",
            startingDate: "2014-09-01T00:00:00.000Z",
            endingDate: "2015-06-30T00:00:00.000Z"
        };

        var user = new User(userVal);
        var course = new Course(courseVal);
        var edition = new Edition(editionVal);

        user.save(function (err, savedUser) {
            if(err) {
                throw err;
            }

            userId = savedUser._id;

            course.editions.push(edition);
            course.save(function (err, savedCourse) {
                if (err) {
                    throw err;
                }

                courseId = savedCourse._id;
                editionId = savedCourse.editions[0]._id;

                basePath = '/courses/' + courseId + '/editions/' + editionId + '/registrants/';

                done();

            });
        });
    });

    it('should register the user', function (done) {
        request(url)
            .post('/courses/' + courseId + '/editions/' + editionId + '/registrants/')
            .send({userId: userId})
            .end(function (err, res) {
                if (err) {
                    throw err;
                }

                res.should.have.status(200);
                done();
            })
    });

    it('should return "true" if the user is registered "false" otherwise', function (done) {
        request(url)
            .get(basePath + userId)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }

                res.body.message.should.equal(true);

                done();
            });
    });

    it('should return the list of all the user registered', function (done) {
        request(url)
            .get(basePath)
            .end(function (err, res) {
                if(err) {
                    throw err;
                }

                res.body.count.should.equal(1);
                done()
            });
    });

    xit('should change the status of the registration to confirmed', function (done) {
        request(url)
            .put(basePath + userId)
            .send({confirmed: true})
            .end(function (err, res) {
                if(err) {
                    throw err;
                }

                res.body.data.registrant.confirmed.should.equal(true);

                done();
            });
    });

    it('should delete the user registration', function (done) {
        request(url)
            .delete(basePath + userId)
            .end(function(err, res) {
                if (err) {
                    throw err;
                }

                res.should.have.status(200);
                done();
            })
    });

    // Scenario cleanup, delete edition, course and user. Disconnect from DB
    after(function (done) {

        // Delete from the db the fake inserted entity
        Course.findByIdAndRemove(courseId);
        User.findByIdAndRemove(userId);

        mongoose.disconnect();
        done();
    });

});


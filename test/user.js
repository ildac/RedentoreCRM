/**
 * Created by Dac on 08/11/14.
 */

var should = require('should-http');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config-debug');

var User = require('../models/user');

describe('Routing for User resource', function () {
    var url = 'http://localhost:8000/api/v1';
    var userId;


    before(function (done) {
        mongoose.connect(config.db.mongodb);
        done();
    });


    it('should insert a new user ', function (done) {
        var user = {
            emails: [{
                email: 'anne@bob.fake'
            }],
            password: 'test',
            personalData: {
                name: 'Anne',
                surname: 'Bob',
                dateOfBirth: new Date('1980', '2', '20'),
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


        request(url)
            .post('/users')
            .send(user)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.should.have.status(200); //Make it return the saved data?
                User.findOne({'personalData.name': 'Anne', 'personalData.surname': 'Bob'}, function(err, user) {
                    userId = user._id;
                });
                done();
            });
    });

    it('should retrieve a specific user', function (done) {
        request(url)
            .get('/users/' + userId)
            .send()
            .end(function (err, res) {
                if(err) {
                    throw err;
                }
                res.body._id.should.equal(userId.toString());
                done();
            });
    });

    it('should update a given user', function (done) {
        var updatedUser = {
            _id: userId,
            emails: [
                {
                    email: 'anne@bob.fake'
                },
                {
                    email:'bob@charlie.fake'    // -- Changed
                }
            ],
            password: 'test',
            personalData: {
                name: 'Anne',
                surname: 'Bob',
                dateOfBirth: new Date('1970', '2', '20'),   // -- Changed
                cityOfBirth: 'Paris',
                provinceOfBirth: 'Paris',
                address: {
                    street: 'Tour Eiffel',
                    number: '21',   // -- Changed
                    city: 'Paris',
                    province: 'Paris',
                    CAP: '75001'
                },
                baptizedInParish: 'Notre Dam De Paris' // -- Changed
            },
            phones: [
                {
                    number: '045871928392',
                    name: 'Reception'
                },
                {
                    number: '484893798423',     // -- Changed
                    name: 'Uncle'
                }
            ],
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

        User.findOne({'personalData.name': 'Anne', 'personalData.surname': 'Bob'}, function(err, user) {
            if (err) {
                console.log(error);
                throw err;
            }

            request(url)
                .put('/users/' + user._id )
                .send(updatedUser)
                .end(function(err, res){
                    if(err) {
                        throw err;
                    }
                    res.body.message.should.equal('updated');
                    res.body.data.should.have.property('_id');
                    res.body.data.emails[1].email.should.equal(updatedUser.emails[1].email);
                    res.body.data.personalData.dateOfBirth.should.equal(updatedUser.personalData.dateOfBirth);
                    res.body.data.personalData.address.number.should.equal(updatedUser.personalData.address.number);
                    res.body.data.personalData.baptizedInParish.should.equal(updatedUser.personalData.baptizedInParish);
                    res.body.data.personalData.phones[2].number.should.equal(updatedUser.personalData.phones[1].number);
                    done();
                });
        });
    });

    it('should delete a specific user', function (done) {
        User.findOne({'personalData.name': 'Anne', 'personalData.surname': 'Bob'}, function(err, user) {
            if (err) {
                throw err;
            }

            request(url)
                .delete('/users/' + user._id)
                .send()
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.message.should.equal('deleted');
                    res.body.data._id.should.equal(user._id.toString());
                    res.body.data.name.should.equal('Anne');
                    done();
                });
        });
    });
});
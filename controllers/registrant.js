/**
 * Created by Dac on 10/11/14.
 */

var Course = require('../models/course');
var Edition = require('../models/courseEdition');
var Registrant = require('../models/registrant');

function selectEdition(req, callback) {
    // not so good, but it's fast to implement
    var edition = [];
    var courseId = req.params.courseId;
    var editionId = req.params.editionId;

    console.log(courseId);

    Course.findById(courseId, function (err, course) {
        if (err) {
            throw err;
        }

        edition = course.editions.filter( function(ed) {
            return ed._id.toString() === editionId.toString();
        });
    });

    if (edition.length === 0) {
        var err = "No edition found for courseId: " + courseId; //TODO implement a smart error manager
    }

    //TODO error check here, if there is no edition...what?!
    callback(err, edition);
};

function findRegistrant(registrants, userId) {
    return registrants.filter(function (reg) {
        return reg.userId.toString() === userId.toString();
    });
}

function isRegistered(edition, userId) {
    var findUser = findRegistrant(edition.registrants, userId);

    return (findUser.length > 0)? true : false;
}

// should return the complete list of the registered user
exports.getRegistrants = function (req, res) {
    selectEdition(req, function (err, edition) {
        if (err) {
            res.send(err);
        }

        res.send(edition[0].registrants);

    });
};

// should return true of false is the user is registered or not
exports.getRegistrant = function (req, res) {
    selectEdition(req, function (err, edition) {
        if (err) {
            throw err;
        }

        res.send({message: isRegistered(edition, req.params.userId)});
    });
};

exports.postRegistrant = function (req, res) {
    selectEdition(req, function (err, edition) {
        if (err) {
            throw err;
        }

        User.findById(req.body.userId, function (err, user) {
            if(err) {
                throw err;
            }

            var registrant = new Registrant({
                enrollmentData: new Date().toISOString(),
                userId: user._id,
                userCardNumber: user.cardNumber
            });

            edition.registrants.push(registrant);
            edition.save(function (err, edition) {
                if (err) {
                    res.send(err);
                }

                res.send(edition.registrants);

            });
        });
    });
};

// return just status 200
exports.deleteRegistrant = function (req, res) {
    selectEdition(req, function (err, edition) {
        if(err) {
            throw err;
        }
        var registrant = findRegistrant(edition.registrants, req.params.userId);

        edition.registrants.pull(registrant._id);
        edition.save(function (err, edition) {
            if (err) {
                res.send(err);
            }

            res.send(edition.registrants);
        });
    });
};

exports.putRegistrant = function (req, res) {
    selectEdition(req, function(err, edition) {
        if (err) {
            throw err;
        }

    });
};

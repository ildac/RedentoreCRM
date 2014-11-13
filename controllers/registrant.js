/**
 * Created by Dac on 10/11/14.
 */

var Course = require('../models/course');
var Edition = require('../models/courseEdition');
var Registrant = require('../models/registrant');
var User = require('../models/user');

function selectEdition(req, callback) {
    // not so good, but it's fast to implement
    var edition = [];
    var courseId = req.params.courseId;
    var editionId = req.params.editionId;

    Course.findById(courseId, function (err, course) {
        if (err) {
            throw err;
        }

        edition = course.editions.filter( function(ed) {
            return ed._id.toString() === editionId.toString();
        });

        if (edition.length === 0) {
            var err = "No edition found for courseId: " + courseId; //TODO implement a smart error manager
        }

        //TODO error check here, if there is no edition...what?!
        callback(err, edition[0]);
    });

};

function findRegistrant(registrants, userId) {
    return registrants.filter(function (reg) {
        return reg.userId.toString() === userId.toString();
    });
}

function isRegistered(edition, userId) {
    var findUser = findRegistrant(edition.enrolledUsers, userId);

    return (findUser.length > 0)? true : false;
}

// should return the complete list of the registered user
exports.getRegistrants = function (req, res) {
    selectEdition(req, function (err, edition) {
        if (err) {
            res.send(err);
        }

        res.send({count: edition.enrolledUsers.length, data: edition.enrolledUsers});

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

            edition.enrolledUsers.push(registrant);
            var course = edition.ownerDocument();
            course.save(function (err, savedCourse) {
                if (err) {
                    res.send(err);
                }
                savedEdition = selectEdition(req, function (err, savedEdition) {
                    if(err) {
                        res.send(err);
                    }

                    res.send(savedEdition.enrolledUsers);

                });
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

        var enrolledUser = findRegistrant(edition.enrolledUsers, req.params.userId);

        edition.enrolledUsers.pull(enrolledUser[0]._id);

        var course = edition.ownerDocument();
        course.save(function (err, savedCourse) {
            if (err) {
                res.send(err);
            }

            selectEdition(req, function (err, savedEdition) {
                if(err) {
                    res.send(err);
                }

                res.send(savedEdition.enrolledUsers);
            });
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

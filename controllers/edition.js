/**
 * Created by Dac on 26/10/14.
 */

var Course = require('../models/course');
var CourseEdition = require('../models/courseEdition');

function selectCourse(courseId, callback) {
    Course.findById(courseId, function (err, course) {
        if (err) {
            throw err;
        }

        callback(course);
    });
}

exports.getEditions = function (req, res) {
    try {
        selectCourse(req.params.courseId, function (course) {
            res.json(course.editions);
        });
    } catch (err) {
        res.send(err);
    }
};

exports.postEdition = function (req, res) {
    try {
        selectCourse(req.params.courseId, function (course) {
            var newEdition = new CourseEdition(req.body)
            course.editions.push(newEdition);
            course.save(function (err, savedCourse) {
                if (err) {
                    res.send(err);
                }

                res.json({message: 'saved', data: savedCourse});
            });
        });
    } catch (err) {
        res.send(err);
    }
};

exports.getEdition = function (req, res) {
    try {
        selectCourse(req.params.courseId, function (course) {
            var edition = course.editions.filter( function(ed) {
                return ed._id.toString() === req.params.editionId.toString();
            });
                if (edition.length === 1) {
                    res.json(edition[0]);
                } else {
                    res.json({message: 'not found'});
                    //TODO send 404
                }
            });
    } catch (err) {
        res.send(err);
    };
};

exports.putEdition = function (req, res) {
    Course.update({ 'editions._id': req.params.editionId, '_id': req.params.courseId },
        { $set: {
            'editions.$.year': req.body.year,
            'editions.$.startingDate': req.body.startingDate,
            'editions.$.endingDate': req.body.endingDate
        }}, function(err, numberOfUpdatedDocs) {
            if (err) {
                res.send(err);
            }

            res.json({message: 'updated', numberOfUpdatedDocs: numberOfUpdatedDocs});

        });
};

exports.deleteEdition = function (req, res) {
    try {
        selectCourse(req.params.courseId, function (course) {
            course.editions.pull(req.params.editionId)
            course.save(function (err){
                if (err) {
                    res.send(err);
                }

                res.json({message: 'deleted'});

            });
        });
    } catch (err) {
        res.send(err);
    };
};


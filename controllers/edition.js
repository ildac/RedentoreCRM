/**
 * Created by Dac on 26/10/14.
 */

var Course = require('../models/course');
var CourseEdition = require('../models/courseEdition');

//TODO make function private
function selectCourse(courseId, callback) {
    Course.findById(courseId, function (err, course) {
        if (err) {
            throw err; //TODO error managment strategy needed
        }

        callback(course);
    });
}

exports.getEditions = function (req, res) {
    try {   //TODO check syntax of try catch in Javascript
        selectCourse(req.params.courseId, function (course) {
            res.json(course.editions);
        });
    } catch (err) {
        res.send(err);
    }
};

exports.postEdition = function (req, res) {
    try {   //TODO check syntax of try catch in Javascript
        selectCourse(req.params.courseId, function (course) {
            var edition = new CourseEdition(req.body)
            course.editions.push(edition);
            course.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({message: 'Edition saved in course ' + course.name});
            });
        });
    } catch (err) {
        res.send(err);
    }
};

exports.getEdition = function (req, res) {
    try {   //TODO check syntax of try catch in Javascript
        selectCourse(req.params.courseId, function (course) {
            course.editions.findById(req.params.editionId, function (err, edition) {
                if (err) {
                    res.send(err);
                }

                res.json(edition);
            });
        });
    } catch (err) {
        res.send(err);
    }
};

exports.putEdition = function (req, res) {
    try {   //TODO check syntax of try catch in Javascript
        selectCourse(req.params.courseId, function (course) {
            course.editions.findOneAndUpdate(req.params.editionId, req.body, function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({message: 'edition updated'});

            });
        });
    } catch (err) {
        res.send(err);
    };
};

exports.deleteEdition = function (req, res) {
    try {   //TODO check syntax of try catch in Javascript
        selectCourse(req.params.courseId, function (course) {
            course.editions.findByIdAndRemove(req.params.editionId, function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({message: 'edition removed'});

            });
        });
    } catch (err) {
        res.send(err);
    };
};
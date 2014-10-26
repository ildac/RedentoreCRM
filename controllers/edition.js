/**
 * Created by Dac on 26/10/14.
 */

var Course = require('../models/course');
var CourseEdition = require('../models/courseEdition');

exports.getEditions = function (req, res) {
    Course.findById(req.params.courseId, function (err, course) {
        if (err) {
            res.send(err);
        }

        res.json(course.editions);
    });
};

exports.postEdition = function (req, res) {
    Course.findById(req.params.courseId, function (err, course) {
        var edition = new CourseEdition(req.body)
        course.editions.push(edition);
        course.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({message: 'Edition saved in course ' + course.name});
        });
    });
};

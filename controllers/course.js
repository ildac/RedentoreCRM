/**
 * Created by Dac on 25/10/14.
 */
var Course = require('../models/course');

exports.getCourses = function (req, res) {
    Course.find(function (err, courses) {
        if (err) {
            res.send(err);
        }

        res.json(courses);
    })
};

exports.postCourse = function (req, res) {
    console.log("chiama a post course" + req.body);
    var course = new Course(req.body);
    course.save(function (err) {
        if (err) {
            res.send(err);
        }

        res.json({message: 'Course saved', data: course});
    });
};

exports.getCourse = function(req, res) {
    Course.findById( req.params.courseId,
        function (err, course) {
            if(err) {
                res.send(err);
            }
            res.json(course);
        }
    );
};

exports.putCourse = function (req, res) {
    Course.findOneAndUpdate({ _id: req.params.courseId }, req.body,
        function (err) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'updated'});
        }
    );
};


exports.deleteCourse = function (req, res) {
    Course.findByIdAndRemove( req.params.courseId,
        function (err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Course removed from the database' });
        }
    );
};
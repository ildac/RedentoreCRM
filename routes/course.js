/**
 * Created by Dac on 25/10/14.
 */
var router = require('express').Router();
var courseController = require('../controllers/course');
var editionController = require('../controllers/edition');

// whih route we have to put on...
// INSERT
// DELETE
// UPDATE
// GET

router.route('/courses')
    .get(courseController.getCourses)
    .post(courseController.postCourse);

router.route('/courses/:courseId')
    .get(courseController.getCourse)
    .put(courseController.putCourse)
    .delete(courseController.deleteCourse);

router.route('/courses/:courseId/editions')
    .get(editionController.getEditions)
    .post(editionController.postEdition);

router.route('/courses/:courseId/editions/:editionId')
    .get(editionController.getEdition)
    .put(editionController.putEdition)
    .delete(editionController.deleteEdition);

module.exports = router;
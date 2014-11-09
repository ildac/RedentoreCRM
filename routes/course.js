/**
 * Created by Dac on 25/10/14.
 */
var router = require('express').Router();
var courseController = require('../controllers/course');
var editionController = require('../controllers/edition');

router.route('/')
    .get(courseController.getCourses)
    .post(courseController.postCourse);

router.route('/:courseId')
    .get(courseController.getCourse)
    .put(courseController.putCourse)
    .delete(courseController.deleteCourse);

router.route('/:courseId/editions')
    .get(editionController.getEditions)
    .post(editionController.postEdition);

router.route('/:courseId/editions/:editionId')
    .get(editionController.getEdition)
    .put(editionController.putEdition)
    .delete(editionController.deleteEdition);

router.route('/:courseId/editions/:editionId/registrants')
    .get(editionController.getRegistrants);


router.route('courses/:courseId/editions/:editionId/registrants/:userId')
    .get(editionController.getRegistrant)
    .post(editionController.postRegistrant)
    .delete(editionController.deleteRegistrant);


module.exports = router;
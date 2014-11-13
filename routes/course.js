/**
 * Created by Dac on 25/10/14.
 */
var router = require('express').Router();
var courseController = require('../controllers/course');
var editionController = require('../controllers/edition');
var registrantController = require('../controllers/registrant');

// Courses
router.route('/')
    .get(courseController.getCourses)
    .post(courseController.postCourse);

router.route('/:courseId')
    .get(courseController.getCourse)
    .put(courseController.putCourse)
    .delete(courseController.deleteCourse);

// Editions
router.route('/:courseId/editions')
    .get(editionController.getEditions)
    .post(editionController.postEdition);

router.route('/:courseId/editions/:editionId')
    .get(editionController.getEdition)
    .put(editionController.putEdition)
    .delete(editionController.deleteEdition);

// Registrants
router.route('/:courseId/editions/:editionId/registrants')
    .get(registrantController.getRegistrants)
    .post(registrantController.postRegistrant);

router.route('/:courseId/editions/:editionId/registrants/:userId')
    .get(registrantController.getRegistrant)
    .put(registrantController.putRegistrant)
    .delete(registrantController.deleteRegistrant);

module.exports = router;
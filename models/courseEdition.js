/**
 * Created by Dac on 26/10/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseEditionEnrolledUser = require('./courseEditionEnrolledUser');

var CourseEditionSchema = Schema({
    year: Date,
    startingDate: {
        type: Date,
        required: true
    },
    endingDate: {
        type: Date,
        required: true
    },
    enrolledUsers: [CourseEditionEnrolledUser.schema]
});

module.exports = mongoose.model('CourseEdition', CourseEditionSchema);

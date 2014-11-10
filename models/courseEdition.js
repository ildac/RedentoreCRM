/**
 * Created by Dac on 26/10/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserEnrollment = require('./registrant');

var CourseEditionSchema = Schema({
    year: String,
    startingDate: {
        type: Date,
        required: true
    },
    endingDate: {
        type: Date,
        required: true
    },
    enrolledUsers: [UserEnrollment.schema]
});

module.exports = mongoose.model('CourseEdition', CourseEditionSchema);

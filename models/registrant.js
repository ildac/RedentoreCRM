/**
 * Created by Dac on 26/10/14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var UserEnrollmentSchema = Schema({
    enrollmentData: Date,
    userCardNumber: {
        type: Schema.Types.ObjectId, //TODO check type!
        ref: User
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('UserEnrollment', UserEnrollmentSchema);
/**
 * Created by Dac on 19/10/14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserEnrollment = require('./userEnrollment');

var Course = require('./User');

var EventsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startingDate: {
        type: Date,
        required: true
    },
    startingTime: {
        type: Date,
        required: true
    },
    endingDate: Date,
    endingTime: Date,
    openTo: [{
        type: Schema.types.objectId,
        ref: Course,
        default: null
    }],
    price: Number,
    enrolledUsers: [UserEnrollment.schema]
});

module.exports = mongoose.model('Event', EventsSchema);

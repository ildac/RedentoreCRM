/**
 * Created by Dac on 19/10/14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseEdition = require('./courseEdition');

var CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    editions: [CourseEdition.schema]
});

module.exports = mongoose.model('Course', CourseSchema);
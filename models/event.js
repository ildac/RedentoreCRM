/**
 * Created by Dac on 19/10/14.
 */
var mongoose = require('mongoose');

var EventsSchema = new mongoose.Schema({
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
    openTo: {
        type: Schema.types.objectId, //--> reference to the Course if null it's global
        default: null
    },
    price: Number,
    registeredUsers: {
        userCardNumber: Schema.types.objectId,
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        status: {
            type: String,
            default: "confirmed"
        }
    }
});

module.exports = mongoose.model('Event', EventsSchema);

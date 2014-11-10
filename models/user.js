/**
 * Created by Dac on 19/10/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    cardNumber: {
        type: String,
        required: true
    },
    emails: [{
        email: {
            type: String,
            required: true
        },
        confirmed: {
            type: Boolean,
            default: false
        }
    }],
    password: {
        type: String,
        required: true
    },
    personalData: {
        name: String,
        surname: String,
        dateOfBirth: Date,
        cityOfBirth: String,
        provinceOfBirth: String,
        address: {
            street: String,
            number: String,
            city: String,
            province: String,
            CAP: String
        },
        baptizedInParish: String
    },
    phones: [{
        number: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],
    scuola: {
        year: Date,
        name: String,
        class: String,
        section: String
    },
    status: [{
        name: {
            type: String,
            required: true,
            default: "pending review" // TODO astrai tutto con i codici
        },
        dateChanged: {
            type: Date,
            default: Date.now
        }
    }],
    note: {
        text: String,
        date: {
            type: Date,
            default: Date.now
        }
    },
    ruolo: {
        type: String,
        default: "user"
    },
    picture: String // TODO come funziona GridFS??

    // questa è una funzione avanzata...il genitore potrebbe gestire anche gli
    // account dei figli da qui, una volta appurata la loro relazione
    // comodo per iscrizioni multiple agli eventi.
/*    childrenId: [{
        name: String,
        surname: String,
        userId: Schema.Types.objectId
    }]
*/
});

module.exports = mongoose.model('User', UserSchema);
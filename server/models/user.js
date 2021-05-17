const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    favMensaID: {
      type:  Number
    },
    favEssen: {
        type: String
    },
    coordinates: {
        type: [Number]
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User }

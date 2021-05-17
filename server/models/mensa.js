const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MensaSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const Mensa = mongoose.model('Mensa', MensaSchema);

module.exports = { Mensa }

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Service = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    term: {
        type: Number,
        required: true
    },
    priceLevel: {
        type: Number,
        required: true
    },
    background: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Service', Service);  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dolarSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        buy: {
            type: String,
            required: true
        },
        sell: {
            type: String,
            required: true
        },
        source: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }
);

module.exports = mongoose.model('Dolar', dolarSchema, 'dolar');

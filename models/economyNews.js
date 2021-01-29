const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const economyNewsSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        link: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }
);

module.exports = mongoose.model('EconomyNews', economyNewsSchema, 'economyNews');

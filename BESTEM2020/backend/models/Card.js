const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    health: {
        type: Number,
        default: 0,
    },

    mana_cost: {
        type: Number,
        default: 0,
    },

    damage: {
        type: Number,
        default: 0,
    },

    description: {
        type: String,
        required: true,
        default: '',
    },

    image_url: {
        type: String,
        required: true,
    },
});

const Card = new mongoose.model('Card', CardSchema);

module.exports = { Card, CardSchema };
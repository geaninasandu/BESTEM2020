const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    health: {
        type: Number,
        default: 0,
    },
    damage: {
        type: Number,
        default: 0,
    },
    manaCost: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String,
        required: true,
    },
});

const Card = new mongoose.model('Card', CardSchema);

module.exports = { Card, CardSchema };


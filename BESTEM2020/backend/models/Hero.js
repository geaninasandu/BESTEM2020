const mongoose = require('mongoose');

const HeroSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    ability: {
        type: {
            name: String,
            description: String,
            cost: Number,
        },
        default: '',
    },

    picture: {
        type: String,
        required: true,
    },

    health: {
        type: Number,
        required: true,
    },
});

const Hero = new mongoose.model('Hero', HeroSchema);

module.exports = { Hero, HeroSchema };
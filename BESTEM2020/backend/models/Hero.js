const mongoose = require('mongoose');

const HeroSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    ability: {
        type: String,
        default: '',
    },
});

const Hero = new mongoose.model('Hero', HeroSchema);

module.exports = { Hero, HeroSchema };
const mongoose = require('mongoose');
const RoundSchema = require('./Round');

const GameSchema = mongoose.Schema({
    firstPlayer: {
        type: RoundSchema,
        required: true,
    },

    secondPlayer: {
        type: RoundSchema,
        required: true,
    },

    round: {
        type: Number,
        required: true,
    },

    active: {
        type: Boolean,
        default: true,
    },
});

const Game = new mongoose.model('Game', GameSchema);

module.exports = { Game, GameSchema };
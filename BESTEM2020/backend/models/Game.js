const mongoose = require('mongoose');
const RoundSchema = require('./Round').RoundSchema;

const GameSchema = mongoose.Schema({
    firstPlayer: {
        type: RoundSchema,
        required: true,
    },
    secondPlayer: {
        type: RoundSchema,
        default: null,
    },
    round: {
        type: Number,
        required: true,
        default: 1,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

const Game = new mongoose.model('Game', GameSchema);

module.exports = { Game, GameSchema };
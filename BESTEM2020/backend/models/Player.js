const mongoose = require('mongoose');
const HeroSchema = require('./Hero').HeroSchema;
const CardSchema = require('./Card').CardSchema;

const PlayerSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    profiles: {
        type: [ {
            name: String,
            hero: HeroSchema,
            cards: [ CardSchema ],
        } ],
        default: [],
    },
});

const Player = new mongoose.model('Player', PlayerSchema);

module.exports = { Player, PlayerSchema };
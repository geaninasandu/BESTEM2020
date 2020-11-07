const mongoose = require('mongoose');
const HeroSchema = require('./Hero').HeroSchema;
const CardSchema = require('./Card').CardSchema;

const PlayerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    profiles: {
        type: [ {
            hero: HeroSchema,
            deck: [ CardSchema ],
        } ],
    },
});

const Player = new mongoose.model('Player', PlayerSchema);

module.exports = { Player, PlayerSchema };
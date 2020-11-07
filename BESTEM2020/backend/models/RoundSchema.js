const mongoose = require('mongoose');
const PlayerSchema = require('./Player').PlayerSchema;
const CardSchema = require('./Card').CardSchema;

const cardAttributes = {
    card: CardSchema,
    tapped: Boolean,
    defender: Boolean,
    currentHealth: Number,
};

const RoundSchema = mongoose.Schema({
    player: PlayerSchema,
    opponent: PlayerSchema,
    health: {
        max: Number,
        current: Number,
    },
    mana: {
        max: Number,
        current: Number,
    },
    deck: [ CardSchema ],
    hand: [ CardSchema ],
    board: [ cardAttributes ],
    heroAbilityTapped: Boolean,
    discard: [ CardSchema ],
    profileId: mongoose.Types.ObjectId,
});

module.exports = RoundSchema;
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
    discard: [ CardSchema ],
    heroAbilityTapped: Boolean,
    profileId: mongoose.Types.ObjectId,
});

const Round = new mongoose.model('Round', RoundSchema);

module.exports = { Round, RoundSchema };
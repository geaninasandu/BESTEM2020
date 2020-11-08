const mongoose = require('mongoose');
const PlayerSchema = require('./Player').PlayerSchema;
const CardSchema = require('./Card').CardSchema;

const cardAttributes = {
    card: CardSchema,
    tapped: {
        type: Boolean,
        default: true,
    },
    defender: {
        type: Boolean,
        default: false,
    },
    currentHealth: {
        type: Number,
        default: 30,
    }
};

const RoundSchema = mongoose.Schema({
    player: PlayerSchema,
    health: {
        max: {
            type: Number,
            default: 30,
        },
        current: {
            type: Number,
            default: 30,
        }
    },
    mana: {
        max: { 
            type: Number,
            default: 10,
        },
        current: {
            type: Number,
            default: 0,
        }
    },
    deck: [ CardSchema ],
    hand: [ CardSchema ],
    board: [ cardAttributes ],
    discard: [ CardSchema ],
    heroAbilityTapped: { 
        type: Boolean,
        default: true,
    },
    profileId: mongoose.Types.ObjectId,
});

const Round = new mongoose.model('Round', RoundSchema);

module.exports = { Round, RoundSchema };
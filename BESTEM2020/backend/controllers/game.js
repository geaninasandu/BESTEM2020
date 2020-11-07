const Game = require('../models/Game').Game;
const Round = require('../models/Round').Round;
const Player = require('../models/Round').Player;
const mongoose = require('mongoose');
const lodash = require('lodash');

exports.playCard = (req, res) => {
    const newCard = req.body.newCard;

    Round.findOne({ 'player._id': mongoose.Types.ObjectId(req.user._id) })
        .then((round) => {
            const cardInHand = round.hand.filter((card) => card._id === newCard._id);
            round.hand = round.hand.filter((card) => card._id !== newCard._id);
            round.board.push(cardInHand);

            round.save()
                .then(() => res.json('Card played successfully.'))
                .catch(err => res.status(404).json(err));
        });
};

exports.createGame = (req, res) => {
    const userId = req.user._id;
    const profile = req.body.profile;

    Player.findOne({ _id: userId }).then((player) => {
        if (!player) {
            return res.status(404).send('player not found');
        }

        const currentProfile = player.profiles.filter(profile => profile._id === profile);

        const round = new Round(player, {}, { max: 30, current: 30}, { max: 10, current: 10 },
                lodash.shuffle(currentProfile.cards), [], [], [], false, profile);

        const game = new Game(round);
        game.save()
            .then(() => res.json("Game created successfully"))
            .catch(() => res.status(500).json({ message: err }));
    });
};
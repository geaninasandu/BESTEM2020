const Game = require('../models/Game').Game;
const Round = require('../models/Round').Round;
const Player = require('../models/Player').Player;
const mongoose = require('mongoose');
const lodash = require('lodash');

exports.playCard = (req, res) => {
    const newCard = req.body.newCard;

    console.log(req.user.id);
    Round.findOne({ 'player._id': req.user.id })
        .then((round) => {
            console.log(round);
            const cardInHand = round.hand.filter((card) => card._id === newCard._id);
            round.hand = round.hand.filter((card) => card._id !== newCard._id);
            round.board.push(cardInHand);

            round.save()
                .then(() => res.json('Card played successfully.'))
                .catch(err => res.status(404).json(err));
        });
};

exports.createGame = (req, res) => {
    const userId = req.user.id;
    const profileId = req.body.profile;

    Player.findOne({ _id: mongoose.Types.ObjectId(userId) }).then((player) => {
        if (!player) {
            return res.status(404).send('player not found');
        }

        let currentProfile = {};
        player.profiles.forEach(profile => {
            if (profile.id === profileId) {
                currentProfile = profile;
            }
        });

        const round = {
            player: player,
            health: {
                max: 30,
                current: 30,
            },
            mana: {
                max: 10,
                current: 10,
            },
            deck: lodash.shuffle(currentProfile.cards),
            hand: [],
            board: [],
            discard: [],
            heroAbilityTapped: false,
            profileId: profileId,
        };

        const gameObj = {
            firstPlayer: round,
            secondPlayer: null,
            round: 1,
            active: true,
        };

        const game = new Game(gameObj);
        game.save()
            .then(() => res.json(game._id))
            .catch((err) => res.status(500).json({ message: err }));
    });
};

exports.joinGame = (req, res) => {
    const gameId = req.body.gameId;
    const userId = req.user.id;
    const profileId = req.body.profile;

    Game.findOne({ _id: mongoose.Types.ObjectId(gameId) })
        .then((game) => {
            if (!game) {
                return res.status(404).json({ message: 'Game not found' });
            }

            if (game.secondPlayer) {
                return res.status(401).json('Game is full');
            }

            if (userId === game.firstPlayer._id) {
                return res.status(401).json('Cannot play by yourself');
            }

            Player.findOne({ _id: mongoose.Types.ObjectId(userId) }).then((player) => {
                if (!player) {
                    return res.status(404).send('Player not found');
                }

                let currentProfile = {};
                player.profiles.forEach(profile => {
                    if (profile.id === profileId) {
                        currentProfile = profile;
                    }
                });

                game.secondPlayer = {
                    player: player,
                    health: {
                        max: 30,
                        current: 30,
                    },
                    mana: {
                        max: 10,
                        current: 10,
                    },
                    deck: lodash.shuffle(currentProfile.cards),
                    hand: [],
                    board: [],
                    discard: [],
                    heroAbilityTapped: false,
                    profileId: profileId,
                };

                game.save()
                    .then(() => res.json(game._id))
                    .catch((err) => res.status(500).json({ message: err }));
            });
        });
};
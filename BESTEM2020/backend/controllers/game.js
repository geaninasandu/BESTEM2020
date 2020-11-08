const Game = require('../models/Game').Game;
const Round = require('../models/Round').Round;
const Player = require('../models/Player').Player;
const mongoose = require('mongoose');
const lodash = require('lodash');
const { truncate } = require('lodash');

exports.getGameState = (req, res) => {
    const gameId = req.params.gameId;
    Game.findOne({ "_id": mongoose.Types.ObjectId(gameId), active: true }).then((currentGame) => {
        if (!currentGame) {
            return res.status(404).send('Game not found.');
        }
        return res.json(currentGame);
    });
};

exports.endTurn = (req, res) => {
    const gameId = req.params.gameId;
    const userId = req.user.id;
    Game.findOne({ "_id": mongoose.Types.ObjectId(gameId), active: true }).then((currentGame) => {
        if (!currentGame) {
            return res.status(404).send('Game not found.');
        }
        var round;
        var isFirstPlayer = false;
        if (currentGame.firstPlayer.player._id == userId) {
            if (currentGame.round % 2 == 0) {
                return res.status(400).send('It\'s not your turn.');
            }
            isFirstPlayer = true;
            round = currentGame.firstPlayer;
        } else if (currentGame.secondPlayer.player._id == userId) {
            if (currentGame.round % 2 == 1) {
                return res.status(400).send('It\'s not your turn.');
            }
            round = currentGame.secondPlayer;
        } else {
            return res.status(404).send('User not found.');
        }

        console.log('One turn passed.');

        if (currentGame.round % 2 == 0) {
            currentGame.firstPlayer.heroAbilityTapped = false;
            currentGame.secondPlayer.heroAbilityTapped = false;

            currentGame.firstPlayer.mana.max += 1;
            currentGame.firstPlayer.mana.current = currentGame.firstPlayer.mana.max;
            currentGame.secondPlayer.mana.max += 1;
            currentGame.secondPlayer.mana.current = currentGame.secondPlayer.mana.max;
        
            currentGame.firstPlayer.board.forEach((cardOnBoard) => cardOnBoard.tapped = false);
            currentGame.secondPlayer.board.forEach((cardOnBoard) => cardOnBoard.tapped = false);

            console.log('Cleanup phase was done.');
        }

        currentGame.round += 1;
 
        currentGame.save()
            .then(() => res.json('Turn complete.'))
            .catch(err => res.status(404).json(err));
    });
};

exports.creatureAttack = (req, res) => {
    const opponentId = req.params.opponentId;
    const creatureId = req.body.creatureId;
    const gameId = req.params.gameId;
    const userId = req.user.id;

    Game.findOne({ "_id": mongoose.Types.ObjectId(gameId), active: true }).then((currentGame) => {
        if (!currentGame) {
            return res.status(404).send('Game not found.');
        }
        var round;
        var isFirstPlayer = false;
        var isOpponentAPlayer = null;
        if (currentGame.firstPlayer.player._id == userId) {
            if (currentGame.round % 2 == 0) {
                return res.status(400).send('It\'s not your turn.');
            }
            if (currentGame.secondPlayer.player._id == opponentId) {
                isOpponentAPlayer = currentGame.secondPlayer;
            }
            isFirstPlayer = true;
            round = currentGame.firstPlayer;
        } else if (currentGame.secondPlayer.player._id == userId) {
            if (currentGame.round % 2 == 1) {
                return res.status(400).send('It\'s not your turn.');
            }
            if (currentGame.firstPlayer.player._id == opponentId) {
                isOpponentAPlayer = currentGame.firstPlayer;
            }
            round = currentGame.secondPlayer;
        } else {
            return res.status(404).send('User not found.');
        }

        const cardsOnBoard = round.board.filter((cardOnBoard) => cardOnBoard.card._id == creatureId);
        
        if (!cardsOnBoard || cardsOnBoard.length == 0) {
            return res.status(404).send('Card not found on board.');
        }

        const cardOnBoard = cardsOnBoard[0];

        if (cardOnBoard.tapped) {
            return res.status(400).send('Card already tapped.');
        }

        if (isOpponentAPlayer) {
            isOpponentAPlayer.health.currentHealth -= cardOnBoard.card.damage;
            cardOnBoard.tapped = true;
            if (isOpponentAPlayer.health.currentHealth <= 0) {
                currentGame.active = false;
            }
        } else {
            var enemyBoard, enemiesOnBoard;

            if (isFirstPlayer) {
                enemyBoard = currentGame.secondPlayer;
                enemiesOnBoard = enemyBoard.board.filter((cardOnBoard) => cardOnBoard.card._id == opponentId);
                
                if (!enemiesOnBoard || enemiesOnBoard.length == 0) {
                    return res.status(404).send('Enemy card not found on board.');
                }

                const enemyCardOnBoard = enemiesOnBoard[0];
                cardOnBoard.currentHealth -= enemyCardOnBoard.card.damage;
                enemyCardOnBoard.currentHealth -= cardOnBoard.currentHealth;
    
                if (cardOnBoard.currentHealth <= 0) {
                    currentGame.firstPlayer.board = currentGame.firstPlayer.board.filer((cardBoard) => cardOnBoard.card._id != cardBoard.card._id);
                } else {
                    cardOnBoard.tapped = true;
                }
    
                if (enemyCardOnBoard.currentHealth <= 0) {
                    currentGame.secondPlayer.board = currentGame.secondPlayer.board.filer((cardBoard) => enemyCardOnBoard.card._id != cardBoard.card._id);
                }
            } else {
                enemyBoard = currentGame.firstPlayer;
                enemiesOnBoard = enemyBoard.board.filter((cardOnBoard) => cardOnBoard.card._id == opponentId);
                
                if (!enemiesOnBoard || enemiesOnBoard.length == 0) {
                    return res.status(404).send('Enemy card not found on board.');
                }

                const enemyCardOnBoard = enemiesOnBoard[0];
                cardOnBoard.currentHealth -= enemyCardOnBoard.card.damage;
                enemyCardOnBoard.currentHealth -= cardOnBoard.currentHealth;
    
                if (cardOnBoard.currentHealth <= 0) {
                    currentGame.secondPlayer.board = currentGame.secondPlayer.board.filer((cardBoard) => cardOnBoard.card._id != cardBoard.card._id);
                } else {
                    cardOnBoard.tapped = true;
                }
    
                if (enemyCardOnBoard.currentHealth <= 0) {
                    currentGame.firstPlayer.board = currentGame.firstPlayer.board.filer((cardBoard) => enemyCardOnBoard.card._id != cardBoard.card._id);
                }
            }
        }

        currentGame.save()
            .then(() => res.json('Attack was successful.'))
            .catch(err => res.status(404).json(err));
    });
};

exports.creatureDefend = (req, res) => {
    const defendant = req.body.defendant;
    const gameId = req.params.gameId;
    const userId = req.user.id;

    Game.findOne({ "_id": mongoose.Types.ObjectId(gameId), active: true }).then((currentGame) => {
        if (!currentGame) {
            return res.status(404).send('Game not found.');
        }
        var round;
        var isFirstPlayer = false;
        if (currentGame.firstPlayer.player._id == userId) {
            if (currentGame.round % 2 == 0) {
                return res.status(400).send('It\'s not your turn.');
            }
            isFirstPlayer = true;
            round = currentGame.firstPlayer;
        } else if (currentGame.secondPlayer.player._id == userId) {
            if (currentGame.round % 2 == 1) {
                return res.status(400).send('It\'s not your turn.');
            }
            round = currentGame.secondPlayer;
        } else {
            return res.status(404).send('User not found.');
        }
    });
};

exports.spawnCreature = (req, res) => {
    const creatureId = req.params.creatureId;
    const gameId = req.params.gameId;
    const userId = req.user.id;
    
    Game.findOne({ "_id": mongoose.Types.ObjectId(gameId), active: true }).then((currentGame) => {
        if (!currentGame) {
            return res.status(404).send('Game not found.');
        }

        var round;
        var isFirstPlayer = false;

        if (currentGame.firstPlayer.player._id == userId) {
            if (currentGame.round % 2 == 0) {
                return res.status(400).send('It\'s not your turn.');
            }
            isFirstPlayer = true;
            round = currentGame.firstPlayer;
        } else if (currentGame.secondPlayer.player._id == userId) {
            if (currentGame.round % 2 == 1) {
                return res.status(400).send('It\'s not your turn.');
            }
            round = currentGame.secondPlayer;
        } else {
            return res.status(404).send('User not found.');
        }

        const cards = round.hand.filter((card) => card._id == creatureId);

        if (!cards || cards.length == 0) {
            return res.status(404).send('Card not found in hand.');
        }

        const cardInHand = cards[0];

        if (cardInHand.type != 'CREATURE') {
            return res.status(400).send('Card type cannot be spawned on the battlefield.');
        }

        if (cardInHand.manaCost > round.mana.current) {
            return res.status(400).send('Not enough mana.');
        }

        round.hand = round.hand.filter((card) => card._id != creatureId);
        round.mana.current -= cardInHand.manaCost;

        const boardCard = {
            card: cardInHand,
            tapped: true,
            defender: false,
            currentHealth: cardInHand.health
        };

        round.board.push(boardCard);

        if (isFirstPlayer) {
            currentGame.firstPlayer.round = round;
        } else {
            currentGame.secondPlayer.round = round;
        }

        currentGame.save()
            .then(() => res.json('Creature was spawned successfully.'))
            .catch(err => res.status(404).json(err));
    });
};

exports.useHeroAbility = (req, res) => {
    Round.findOne({ 'player._id': req.user.id })
        .then((round) => {
            if (!round) {
                return res.status(404).send('Round not found.');
            }

            if (round.heroAbilityTapped) {
                return res.status(400).send('Hero ability cannot be tapped.');
            }

            const currentProfile = round.player.profiles.filter((profile) => mongoose.Types.ObjectId(profile._id) === round.profileId);

            if (!currentProfile) {
                return res.status(404).send('Player profile not found.');
            }

            if (currentProfile.hero.ability.cost > round.mana.current) {
                return res.status(400).send('Not enough mana!');
            }

            round.mana.current -= currentProfile.hero.ability.cost;
            round.heroAbilityTapped = true;

            // if () TODO

            round.save()
                .then(() => res.json('Hero ability used successfully.'))
                .catch(err => res.status(404).json(err));
        });
};

exports.useCreature = (req, res) => {
    Round.findOne({ 'player._id': req.user.id })
        .then((round) => {
            if (!round) {
                return res.status(404).send('Round not found.');
            }

            if (round.heroAbilityTapped) {
                return res.status(400).send('Hero ability cannot be tapped.');
            }

            const currentProfile = round.player.profiles.filter((profile) => mongoose.Types.ObjectId(profile._id) === round.profileId);

            if (!currentProfile) {
                return res.status(404).send('Player profile not found.');
            }

            if (currentProfile.hero.ability.cost > round.mana.current) {
                return res.status(400).send('Not enough mana!');
            }

            round.mana.current -= currentProfile.hero.ability.cost;
            round.heroAbilityTapped = true;

            round.save()
                .then(() => res.json('Hero ability used successfully.'))
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

        Game.findOne({ "firstPlayer.player._id": mongoose.Types.ObjectId(userId), active: true }).then((game) => {
            if (game) {
                return res.status(400).send('You already started a game.');
            }

            Game.findOne({ "secondPlayer.player._id": mongoose.Types.ObjectId(userId), active: true }).then((queryGame) => {
                if (queryGame) {
                    return res.status(400).send('You cannot create a game if you already joined one.');
                }

                let currentProfile = null;
                player.profiles.forEach(profile => {
                    if (profile.id === profileId) {
                        currentProfile = profile;
                    }
                });


                if (!currentProfile) {
                    return res.status(404).send('Player profile not found');
                }

                const round = {
                    player: player,
                    health: {
                        max: 30,
                        current: 30,
                    },
                    mana: {
                        max: 0,
                        current: 0,
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

                const newGame = new Game(gameObj);

                newGame.save()
                    .then(() => res.json(newGame._id))
                    .catch((err) => res.status(500).json({ message: err }));
            });
        });
    });
};

exports.joinGame = (req, res) => {
    const userId = req.user.id;
    const gameId = req.params.gameId;
    const profileId = req.body.profile;

    Game.findOne({ _id: mongoose.Types.ObjectId(gameId) })
        .then((game) => {
            if (!game) {
                return res.status(404).json({ message: 'Game not found' });
            }

            if (game.secondPlayer) {
                return res.status(401).json('Game is full');
            }

            if (userId == game.firstPlayer.player._id) {
                return res.status(401).json('Cannot play by yourself');
            }

            Player.findOne({ _id: mongoose.Types.ObjectId(userId) }).then((player) => {
                if (!player) {
                    return res.status(404).send('Player not found');
                }

                Game.findOne({ "secondPlayer.player._id": mongoose.Types.ObjectId(userId), active: true }).then((queryGame) => {
                    if (queryGame) {
                        return res.status(400).send('You already joined a game.');
                    }

                    Game.findOne({ "first.player._id": mongoose.Types.ObjectId(userId), active: true }).then((queryGameSecondary) => {
                        if (queryGameSecondary) {
                            return res.status(400).send('You cannot join a game if you created one.');
                        }

                        let currentProfile = null;
                        player.profiles.forEach(profile => {
                            if (profile.id === profileId) {
                                currentProfile = profile;
                            }
                        });

                        if (!currentProfile) {
                            return res.status(404).send('Player profile not found');
                        }

                        game.secondPlayer = {
                            player: player,
                            health: {
                                max: 30,
                                current: 30,
                            },
                            mana: {
                                max: 0,
                                current: 0,
                            },
                            deck: lodash.shuffle(currentProfile.cards),
                            hand: [],
                            board: [],
                            discard: [],
                            heroAbilityTapped: false,
                            profileId: profileId,
                        };

                        game.firstPlayer.mana.max += 1; 
                        game.firstPlayer.mana.current = game.firstPlayer.mana.max;
                        game.secondPlayer.mana.max += 1;
                        game.secondPlayer.mana.current = game.secondPlayer.mana.max;

                        for (let i = 0; i < 3; ++i) {
                            game.firstPlayer.hand.push(game.firstPlayer.deck[0]);
                            game.firstPlayer.deck.shift();
                            game.secondPlayer.hand.push(game.secondPlayer.deck[0]);
                            game.secondPlayer.deck.shift();
                        }

                        game.save()
                            .then(() => res.json(game._id))
                            .catch((err) => res.status(500).json({ message: err }));
                    });
                });
            });
        });
};
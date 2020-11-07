const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Player = require('../models/Player').Player;
const { addToken, credentialsValidator } = require('../utils/player.utils');
const Card = require('../models/Card').Card;

exports.getPlayerById = (req, res) => {
    Player.findOne({ _id: req.params.playerId })
        .then((player) => {
            if (!player) {
                res.status(404).json('User not found');
            }

            res.json({
                username: player.username,
                profiles: player.profiles,
            });
        })
        .catch(err => res.status(500).send(err));
};

exports.login = (req, res) => {
    Player.findOne({ username: req.body.username })
        .then(player => {
            if (!player) {
                return res.status(404).json({ message: 'Player does not exist!' });
            }

            bcrypt.compare(req.body.password, player.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({ message: 'Password is incorrect!' });
                    }

                    jwt.sign({ id: player._id }, process.env.JWT_KEY, (err, token) => {
                        if (err) {
                            return res.status(404).json(err);
                        }

                        res.cookie('t', token);

                        return res.json({
                            player: {
                                _id: player._id,
                                username: player.username,
                            },
                            token,
                        });
                    });
                })
                .catch(err => res.status(500).json({ message: err }));
        });
};

exports.register = (req, res) => {
    const player = new Player(req.body);

    bcrypt.hash(player.password, 10)
        .then(hash => {
            player.password = hash;
            player.save().then(() => addToken(player, res));
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: err });
        });
};

exports.getProfiles = (req, res) => {
    Player.findById(req.params.playerId)
        .then((player) => {
            if (!player) {
                return res.status(404).json({ message: 'Player does not exist!' });
            }

            res.send(player.profiles);
        })
        .catch(err => res.status(500).send(err));
};

exports.addProfile = (req, res) => {
    const query = { _id: req.params.playerId, 'profiles.name': { $ne: req.body.profileName } },
        update = { $push: { profiles: req.body } };

    Player.updateOne(query, update)
        .then(result => res.json(result))
        .catch(err => res.status(404).json(err));
};

exports.updateProfile = (req, res) => {
    Player.updateOne({ _id: req.params.playerId, profiles: { $elemMatch: { _id: req.params.profileId } } },
        { $set: { 'profiles.$': req.body } })
        .then(() => res.json('Profile updated successfully.'))
        .catch(err => res.status(404).json(err));
};

exports.addCard = (req, res) => {
    Card.insertOne(
            {
                'name': 'Fin',
                'type': 'CREATURE',
                'health': 2,
                'damage': 1,
                'manaCost': 1,
                'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/fin.png?alt=media&token=6bec115f-b7e7-48f0-93e8-9ce7ccb47525',
            },
        //     {
        //         'name': 'Jake',
        //         'type': 'CREATURE',
        //         'health': 1,
        //         'damage': 2,
        //         'manaCost': 1,
        //         'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/jake.png?alt=media&token=1f137568-894b-4266-8063-e25050670f55',
        //     },
        //     {
        //         'name': 'Rayman',
        //         'type': 'CREATURE',
        //         'health': 3,
        //         'damage': 2,
        //         'manaCost': 2,
        //         'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/rayman.png?alt=media&token=045f6806-769e-4a9f-946d-03e6625d621f',
        //     },
        //     {
        //         'name': 'Hellboy',
        //         'type': 'CREATURE',
        //         'health': 2,
        //         'damage': 4,
        //         'manaCost': 3,
        //         'imageUrl': '',
        //     },
        //     {
        //         'name': 'Xull',
        //         'type': 'CREATURE',
        //         'health': 6,
        //         'damage': 1,
        //         'manaCost': 4,
        //         'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/xull.png?alt=media&token=df3f777e-7c32-4b71-8f37-88c06c29d394',
        //     },
        //     {
        //         'name': 'Yumiko',
        //         'type': 'CREATURE',
        //         'health': 5,
        //         'damage': 4,
        //         'manaCost': 4,
        //         'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/yumiko.png?alt=media&token=b2a14be7-148d-49b5-a3a5-4157b12427c5',
        //     },
        //     {
        //         'name': 'WuShang',
        //         'type': 'CREATURE',
        //         'health': 4,
        //         'damage': 6,
        //         'manaCost': 5,
        //         'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/WuShang.png?alt=media&token=c885423c-ba40-4e75-a445-b43dba897a5d',
        //     },
        //     {
        //         'name': 'Nimue',
        //         'type': 'CREATURE',
        //         'health': 5,
        //         'damage': 5,
        //         'manaCost': 5,
        //         'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/nimue.png?alt=media&token=65c4c4d3-86b6-465a-bfa0-76352c305537',
        //     },
        //     {
        //         'name': 'Lobster',
        //         'type': 'CREATURE',
        //         'health': 5,
        //         'damage': 6,
        //         'manaCost': 6,
        //         'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/lobster.png?alt=media&token=e9c87844-3c2f-41d4-aa81-5ad3df0bdb72',
        //     },
        //     {
        //         'name': 'Orion',
        //         'type': 'CREATURE',
        //         'health': 7,
        //         'damage': 6,
        //         'manaCost': 7,
        //         'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/orion.png?alt=media&token=a42707c2-b87a-41a3-921f-771e61a8bc2e',
        //     },
        //     {
        //         'name': 'barraza',
        //         'type': 'CREATURE',
        //         'health': 7,
        //         'damage': 7,
        //         'manaCost': 9,
        //         'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/barraza.png?alt=media&token=239de3f3-54fa-4d9b-add1-8bd48398cca0',
        //     },
        //     {
        //         'name': 'brynn',
        //         'type': 'CREATURE',
        //         'health': 7,
        //         'damage': 7,
        //         'manaCost': 9,
        //         'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/brynn.png?alt=media&token=590402d7-17e2-41b6-bd4d-96b3e1e84895',
        //     },
        //     {
        //         'name': 'Teros',
        //         'type': 'CREATURE',
        //         'health': 8,
        //         'damage': 9,
        //         'manaCost': 10,
        //         'imageUrl': 'https://firebasestorage.googleapis.com/v0/b/bestem-1426e.appspot.com/o/teros.png?alt=media&token=16539974-fd69-47b2-880d-2850186755b5',
        //     },
        // ],
    )
        .then(() => res.send('ok'))
        .catch(() => res.send('not ok'));
};
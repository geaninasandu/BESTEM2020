const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Player = require('../models/Player').Player;
const { addToken, credentialsValidator } = require('../utils/player.utils');

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
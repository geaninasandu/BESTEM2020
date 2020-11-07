const express = require('express');
const controller = require('../../controllers/player');
const router = express.Router();

router.route('/:playerId')
    .get(controller.getPlayerById);

router.route('/register')
    .post(controller.register);

router.route('/login')
    .post(controller.login);

router.route('/:playerId/profiles')
    .get(controller.getProfiles)
    .post(controller.addProfile);

router.route('/:playerId/profiles/:profileId')
    .patch(controller.updateProfile);

module.exports = router;
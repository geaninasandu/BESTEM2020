const express = require('express');
const controller = require('../../controllers/player');
const router = express.Router();
const auth = require('../../middleware');

router.route('/:playerId')
    .get(controller.getPlayerById);

router.route('/register')
    .post(controller.register);

router.route('/login')
    .post(controller.login);

router.route('/:playerId/profiles')
    .get(auth, controller.getProfiles)
    .post(auth, controller.addProfile);

router.route('/:playerId/profiles/:profileId')
    .patch(auth, controller.updateProfile);

module.exports = router;
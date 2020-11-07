const express = require('express');
const router = express.Router();
const controller = require('../../controllers/game');
const auth = require('../../middleware');

router.post('/playCard', auth, controller.playCard);

router.route('/')
    .post(auth, controller.createGame);

router.route('/joinGame')
    .post(auth, controller.joinGame);

module.exports = router;
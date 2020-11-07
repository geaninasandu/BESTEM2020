const express = require('express');
const router = express.Router();
const controller = require('../../controllers/game');

router.post('/playCard', controller.playCard);

router.route('/')
    .post(controller.createGame);

module.exports = router;
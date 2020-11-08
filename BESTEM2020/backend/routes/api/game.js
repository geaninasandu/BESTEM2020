const express = require('express');
const router = express.Router();
const controller = require('../../controllers/game');
const auth = require('../../middleware');

router.route('/:gameId/spawnCreature/:creatureId')
    .post(auth, controller.spawnCreature);

router.route('/:gameId/:creatureId/creatureAttack/:opponentId')
    .post(auth, controller.creatureAttack);

router.route('/:gameId/:creatureId/creatureDefend')
    .post(auth, controller.creatureDefend);

router.route('/useHeroAbility')
    .post(auth, controller.useHeroAbility);

router.route('/:gameId/endTurn')
    .post(auth, controller.endTurn);

router.route('/createGame')
    .post(auth, controller.createGame);

router.route('/:gameId/joinGame')
    .post(auth, controller.joinGame);

router.route('/:gameId/')
    .get(controller.getGameState);

module.exports = router;
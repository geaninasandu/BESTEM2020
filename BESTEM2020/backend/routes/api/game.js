const express = require('express');
const router = express.Router();
const controller = require('../../controllers/game');
const auth = require('../../middleware');

router.route('/:gameId/:creatureId/spawnCreature')
    .post(auth, controller.spawnCreature);

router.route('/:gameId/:creatureId/creatureAttack/:opponentId')
    .post(auth, controller.spawnCreature);

router.route('/:gameId/:creatureId/creatureDefend')
    .post(auth, controller.spawnCreature);

router.route('/castSpell')
    .post(auth, controller.spawnCreature);

router.route('/useHeroAbility')
    .post(auth, controller.spawnCreature);

router.route('/useHeroAbility')
    .post(auth, controller.spawnCreature);

router.route('/endTurn')
    .post(auth, controller.spawnCreature);

router.route('/:gameId/joinGame')
    .post(auth, controller.joinGame);

module.exports = router;
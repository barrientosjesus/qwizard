const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/api/games');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/quiz/:quizID', gamesCtrl.getAllForQuiz)
router.get('/', ensureLoggedIn, gamesCtrl.getAllForUser);

module.exports = router;
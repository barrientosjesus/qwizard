const express = require('express');
const router = express.Router();
const quizzesCtrl = require('../../controllers/api/quizzes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', quizzesCtrl.getAll);
router.get('/:id', ensureLoggedIn, quizzesCtrl.getOne);
router.post('/create', ensureLoggedIn, quizzesCtrl.create);
router.delete('/delete/:id', ensureLoggedIn, quizzesCtrl.deleteOne);

module.exports = router;
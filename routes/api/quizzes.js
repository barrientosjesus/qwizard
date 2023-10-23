const express = require('express');
const router = express.Router();
const quizzesCtrl = require('../../controllers/api/quizzes');

router.post('/create', quizzesCtrl.create)

module.exports = router;
// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
const Quiz = require('./models/quiz');
const Score = require('./models/game');

// Local variables will come in handy for holding retrieved documents
let user, quiz, score;
let users, quizzes, scores;

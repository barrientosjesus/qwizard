const Game = require("../../models/game.js");

module.exports = {
    getAllForUser,
    getAllForQuiz
};

async function getAllForUser(req, res) {
    const games = await Game.find({
        'players': {
            $elemMatch: {
                'userID': req.user._id
            }
        }
    }).populate('quiz').populate('players');
    res.json(games);
}

async function getAllForQuiz(req, res) {
    const games = await Game.find({
        quiz: req.params.quizID
    }).populate('quiz').populate('players');
    res.json(games);
}
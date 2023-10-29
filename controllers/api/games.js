const Game = require("../../models/game.js");

module.exports = {
    getAllForUser
};

async function getAllForUser(req, res) {
    const quizzes = await Game.find({
        'players': {
            $elemMatch: {
                'userID': req.user._id
            }
        }
    }).populate('quiz').populate('players');
    res.json(quizzes);
}
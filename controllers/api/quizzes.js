const Quiz = require('../../models/quiz');

module.exports = {
    create,
};

async function create(req, res) {
    try {
        req.body.user = req.user._id;
        const quiz = await Quiz.create(req.body);
        res.json(quiz);
    } catch (err) {
        res.status(400).json(err);
        console.error(err);
    }
}
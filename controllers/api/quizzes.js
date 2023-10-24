const { resolvePath } = require('react-router-dom');
const Quiz = require('../../models/quiz');

module.exports = {
    create,
    getAll,
    getOne
};

async function create(req, res) {
    try {
        req.body.user = req.user._id;
        const quiz = (await Quiz.create(req.body));
        res.json(quiz);
    } catch (err) {
        res.status(400).json(err);
        console.error(err);
    }
}

async function getAll(req, res) {
    const quizzes = await Quiz.find({}).populate('user', 'name');
    res.json(quizzes);
}

async function getOne(req, res) {
    try {
        const quiz = await Quiz.findOne({ _id: req.params.id });
        res.json(quiz);
    } catch (err) {
        console.error(err)
        res.json(null)
    }
}
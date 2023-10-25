const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScoreSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: Number
})

const scoreSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    maxScore: Number
}, {
    timestamps: true
});

scoreSchema.pre('save', async function (next) {
    const Quiz = mongoose.model('Quiz');
    const quiz = await Quiz.findById(this.quiz);

    if (quiz) {
        this.maxScore = quiz.questions.length;
    }

    next();
});

module.exports = mongoose.model('Score', scoreSchema);
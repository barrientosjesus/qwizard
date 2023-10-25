const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: false,
        required: true
    }
});

const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    answers: [answerSchema]
});

const quizSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'No description available.',
    },
    category: {
        type: String,
        enum: ['General', 'Programming', 'Movies', 'TV Shows', 'Gaming', 'People', 'Misc'],
        required: true
    },
    questions: [questionSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

quizSchema.virtual('highestScoreWithUser').get(async function () {
    const Score = mongoose.model('Score');
    const highestScore = await Score.findOne({ quiz: this._id })
        .sort({ score: -1 })
        .limit(1)
        .populate('user', 'name');

    return highestScore;
});

module.exports = mongoose.model('Quiz', quizSchema);
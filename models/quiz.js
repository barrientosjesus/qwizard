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

const highScoreSchema = new Schema({
    playerName: String,
    score: Number
})

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
    },
    highScore: {
        type: highScoreSchema,
        default: { playerName: 'None', score: 0 }
    },
    averageScore: {
        type: Number,
        default: 0
    },
    totalPlays: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

quizSchema.virtual('formattedDate').get(function () {
    const date = this.createdAt;
    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    return formattedDate;
});

module.exports = mongoose.model('Quiz', quizSchema);
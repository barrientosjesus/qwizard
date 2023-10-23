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
});

module.exports = mongoose.model('Quiz', quizSchema);
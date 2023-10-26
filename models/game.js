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

const gameSchema = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    scores: [userScoreSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);
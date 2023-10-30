const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    score: [Number],
    hasAnswered: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: { virtuals: true }
});

const gameSchema = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    players: [playerSchema],
    currentQuestionIndex: {
        type: Number,
        default: 0
    },
    inProgress: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

playerSchema.virtual('totalScore').get(function () {
    return this.score.reduce((acc, num) => acc + num, 0).toFixed(2);
});

gameSchema.statics.getActiveForUser = function (user) {
    return this.findOne({ 'scores.userID': user._id, inProgress: true });
};

gameSchema.statics.createForUsers = async function (quizID, users) {
    const players = users.map((user) => ({
        name: user.name,
        userID: user._id,
        score: 0
    }));

    const game = new this({ quiz: quizID, players });

    await game.save();

    return game;
};

module.exports = mongoose.model('Game', gameSchema);
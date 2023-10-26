const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    userID: {
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'User',
        required: true
    },
    score: {
        type: Number,
        default: 0
    }
});

const gameSchema = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    players: [playerSchema],
    currentQuestionIndex: Number,
    inProgress: Boolean
}, {
    timestamps: true
});

gameSchema.statics.getActiveForUser = function (user) {
    return this.findOne({ 'scores.userID': user._id });
};

gameSchema.statics.createForUser = async function (user, quizID) {
    const game = new this({ quiz: quizID });
    game.players.push({ name: user.name, userID: user._id });
    await game.save();
    return game;
};

module.exports = mongoose.model('Game', gameSchema);
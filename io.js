const jwt = require('jsonwebtoken');
const Game = require('./models/game');
const Quiz = require('./models/quiz');

let io;

const games = {};
const lobbies = {};
const isSaving = {};
const isLeaving = {};
const rejoining = {};

module.exports = {
  init,
  getIo
};

function init(http) {
  io = require('socket.io')(http);

  io.on("connection", function (socket) {
    console.log(`Socket ${socket.id} connected`);
    socket.on('disconnect', function () {
      console.log('disconnected');
      console.log(`Socket ${socket.id} disconnected`);
    });

    socket.on('sendMessage', ({ quizID, user, question }) => {
      socket.to(quizID).emit('update-game', `${user}: ${question}`);
    });

    socket.on('get-active', async function (token) {
      const user = await validateToken(token);
      if (!user) return;
      let game = findGameInMemory(user);
      if (!game) game = await Game.getActiveForUser(user);
      if (game) {
        if (rejoining[game._id]) {
          rejoining[game._id] = true;
          const userInGame = game.players.find(p => p.userID.equals(user._id));
          while (userInGame.score.length <= game.currentQuestionIndex - 1) {
            userInGame.score.push(0);
          }
          await game.save();
          rejoining[game._id] = false;
        }
        socket.join(game._id.toString());
        games[game._id.toString()] = game;
        io.to(game._id.toString()).emit('update-game', game);
      }
    });

    socket.on('newGame', async function (quizID) {
      if (games[quizID]) return;
      const game = await Game.createForUsers(quizID, lobbies[quizID]);
      games[game._id] = game;

      io.to(quizID).emit('update-game', game);
      io.to(quizID).emit('update-lobby', []);
      io.in(quizID).socketsJoin(game._id.toString());
      io.in(quizID).socketsLeave(quizID);

      delete lobbies[quizID];
    });

    socket.on('joinLobby', async function ({ quizID, token }) {
      const user = await validateToken(token);
      if (games)
        if (!user) return;

      if (!lobbies[quizID]) {
        lobbies[quizID] = [];
      }

      if (!lobbies[quizID].some(u => u._id === user._id)) {
        lobbies[quizID].push(user);
      }

      socket.join(quizID);
      io.to(quizID).emit('update-lobby', lobbies[quizID]);
    });

    socket.on('leaveLobby', async function ({ quizID, token }) {
      const user = await validateToken(token);
      if (!user) return;
      socket.leave(quizID);
      lobbies[quizID] = lobbies[quizID]?.filter(u => u._id !== user._id);
      io.to(quizID).emit('update-lobby', lobbies[quizID]);
    });

    socket.on('leave-game', async function ({ token, quizID}) {
      console.log('leaving game')
      const user = await validateToken(token);
      if (!user) return;
      const game = await Game.getActiveForUser(user);
      if (!game) return;
      const userInGame = game.players?.find(p => p.userID.equals(user._id));
      console.log(userInGame)
      if (isLeaving[user._id]) {
        setTimeout(async () => {
          if (userInGame && game.inProgress) {
            isLeaving[user._id] = true;
            userInGame.leftGame = true;
            await game.save();
            console.log('leaving game game: ', game)
          }
        }, 2000);
      } else {
        if (userInGame && game.inProgress) {
          isLeaving[user._id] = true;
          userInGame.leftGame = true;
          await game.save();
          console.log('leaving game game: ', game)
        }
      }
      isLeaving[user._id] = false;
      if (game.players?.every(p => p.hasAnswered || p.leftGame)) {
        console.log('leaving game all users answerd or exited')
        const gameID = game._id
        io.to(game._id.toString()).emit('next-question', { gameID, quizID });
        console.log('ran next game')
      }
    });

    socket.on('update-score', async function ({ token, gameID, score }) {
      const user = await validateToken(token);
      if (!user) return;
      const game = await Game.findOne({ _id: gameID });
      const player = game.players.find(p => p.userID.equals(user._id));
      player.score.push(score);
      player.hasAnswered = true;
      await game.save();

      if (game.players.every(p => p.hasAnswered || p.leftGame)) {
        const quizID = game.quiz._id;
        io.to(game._id.toString()).emit('next-question', { gameID, quizID });
      } else {
        io.to(game._id.toString()).emit('update-game', game);
      }
    });

    socket.on('next-question', async function ({ gameID, quizID }) {
      console.log('next question running')
      const game = await Game.findOne({ _id: gameID });
      if (!game) return;

      setTimeout(async () => {
        if (game.players.every(p => p.hasAnswered || p.leftGame)) {
          console.log('next question post timeout conditional')
          game.players.forEach(p => p.hasAnswered = false);
          const quiz = await Quiz.findOne({ _id: quizID });

          if (quiz.questions.length === game.currentQuestionIndex + 1) {
            io.to(game._id.toString()).emit('end-game', gameID);
          } else {
            game.currentQuestionIndex += 1;
            await game.save();
            io.to(game._id.toString()).emit('update-game', game);
          }
        }
      }, 2000);
    });

    socket.on('end-game', async function (gameID) {
      try {
        const game = await Game.findOne({ _id: gameID }).populate('quiz');

        if (!game) return;
        if (!game.inProgress) return;

        const quiz = await Quiz.findOne({ _id: game.quiz._id });
        quiz.totalPlays += game.players.length;
        if (quiz.averageScore === 0 || !quiz.totalPlays === 0) {
          quiz.averageScore = calculateAverage(game.players);
        } else {
          quiz.averageScore = calculateAverage(game.players, quiz.totalPlays, quiz.averageScore);
        }
        quiz.highScore = updateHighScore(game.players, quiz.highScore);
        if (isSaving[gameID]) return;
        isSaving[gameID] = true;
        await quiz.save();
        game.inProgress = false;
        game.players.forEach(p => p.score.shift());
        await game.save();
        io.to(game._id.toString()).emit('update-game', game);
        socket.leave(game._id.toString());
        isSaving[gameID] = false;
        delete games[game._id]
      } catch (error) {
        console.error('Error: ', error);
      }
    });
  });
}

function getIo() {
  return io;
}

function findGameInMemory(user) {
  let gamesArr = Object.values(games);
  const game = gamesArr.find(g => g.players.some(p => p.playerId === user._id));
  return game;
}

function validateToken(token) {
  return new Promise(function (resolve) {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) resolve(false);
      resolve(decoded.user);
    });
  });
}

function calculateAverage(newPlayerScores, totalPlays = newPlayerScores.length, previousAverage = 0) {
  const totalScores = previousAverage * (totalPlays - newPlayerScores.length);
  const newScoresTotal = newPlayerScores.reduce((total, player) => total + player.totalScore, 0);
  const updatedTotalScores = totalScores + parseInt(newScoresTotal);
  const updatedAverage = updatedTotalScores / totalPlays;
  return parseFloat(updatedAverage.toFixed(2));
}

function updateHighScore(newPlayers, previousScore) {
  let newScore = previousScore;
  newPlayers.forEach(p => {
    newScore = p.totalScore > newScore.score ? { playerName: p.name, score: p.totalScore } : newScore;
  });
  return newScore;
}
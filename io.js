const jwt = require('jsonwebtoken');
const Game = require('./models/game');
const Quiz = require('./models/quiz');

let io;

const games = {};
const lobbies = {};
const answeredPlayers = {};
const nextQuestionProcessing = {};

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
      io.in(quizID).socketsJoin(game._id.toString())
      io.in(quizID).socketsLeave(quizID)
      
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

    socket.on('update-score', async function ({ token, gameID, score }) {
      const user = await validateToken(token);
      if (!user) return;
      const game = await Game.findOne({ _id: gameID });
      const player = game.players.find(p => p.userID.equals(user._id));
      player.score += score;
      player.hasAnswered = true;
      await game.save();

      if (!answeredPlayers[gameID]) {
        answeredPlayers[gameID] = [];
      }
      answeredPlayers[gameID].push(player.userID);

      if (answeredPlayers[gameID].length === game.players.length) {
        console.log('all players played');
        const quizID = game.quiz._id;
        io.to(game._id.toString()).emit('next-question', { gameID, quizID });
        answeredPlayers[gameID] = [];
      } else {
        io.to(game._id.toString()).emit('update-game', game);
      }
    });

    socket.on('next-question', async function ({ gameID, quizID }) {
      console.log('next questions');
      const game = await Game.findOne({ _id: gameID });
      if (!game) return;

      if (nextQuestionProcessing[gameID]) {
        return;
      }

      nextQuestionProcessing[gameID] = true;

      game.players.forEach(p => p.hasAnswered = false);
      const quiz = await Quiz.findOne({ _id: quizID });
      if (quiz.questions.length === game.currentQuestionIndex + 1) {
        io.to(game._id.toString()).emit('end-game', gameID);
      } else {
        console.log('else next-question');
        game.currentQuestionIndex += 1;
        await game.save();
        io.to(game._id.toString()).emit('update-game', game);
      }
      nextQuestionProcessing[gameID] = false;
    });

    socket.on('end-game', async function (gameID) {
      console.log('end game');
      const game = await Game.findOne({ _id: gameID });
      if (!game) return;
      game.inProgress = false;
      await game.save();
      console.log('end game post save');
      io.to(game._id.toString()).emit('update-game', game);
      socket.leave(game._id.toString());
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
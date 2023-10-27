const jwt = require('jsonwebtoken');
const Game = require('./models/game');

let io;

const games = {};
const lobbies = {};

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

    socket.on('joinGame', async function ({ quizID, token }) {
      const user = await validateToken(token);
      let game;
      if (!user) return;
      if (games[quizID]) {
        // if game in progress,
        game = games[quizID];
        const isUserInGame = game.players.some(player => player.userID.toString() === user._id.toString());

        if (!isUserInGame) {
          game.players.push({
            name: user.name,
            userID: user._id
          });

          await game.save();
        }
      } else {
        game = await Game.createForUser(user, quizID);
        games[quizID] = game;
      }
      socket.join(game._id.toString());
      io.to(game._id.toString()).emit('update-game', `${user.name} Joined`);
    });

    socket.on('joinLobby', async function ({ quizID, token }) {
      const user = await validateToken(token);
      if (!user) return;

      if (!lobbies[quizID]) {
        lobbies[quizID] = [];
      }

      if (!lobbies[quizID].some(u => u._id === user._id)) {
        lobbies[quizID].push(user);
      }

      socket.join(quizID);
      io.to(quizID).emit('update-game', lobbies[quizID]);
    });

    socket.on('leaveLobby', async function ({quizID, token}) {
      console.log('leaveing room')
      const user = await validateToken(token);
      if (!user) return;
      socket.leave(quizID);
      lobbies[quizID] = lobbies[quizID].filter(u => u._id !== user._id)
      io.to(quizID).emit('update-game', lobbies[quizID])
    })
  });
}

function getIo() {
  return io;
}

function validateToken(token) {
  return new Promise(function (resolve) {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) resolve(false);
      console.log('Decoded user: ', decoded.user);
      resolve(decoded.user);
    });
  });
}
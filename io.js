const jwt = require('jsonwebtoken');
const Game = require('./models/game');

let io;

const games = {};

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

    socket.on('sendMessage', ({quizID, user, question}) => {
      socket.to(quizID).emit('update-game', `${user}: ${question}`);
    });

    socket.on('joinGame', (quizID, userName) => {
      socket.join(quizID);
      io.to(quizID).emit('update-game', `${userName} Joined`)
    });
  });
}

function getIo() {
  return io;
}

function validateToken(token) {
  return new Promise(function (resolve) {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) resolve(false);
      resolve(decoded.user);
    });
  });
}
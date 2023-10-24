const jwt = require('jsonwebtoken');
const Quiz = require('./models/quiz');
const { Server } = require('socket.io');

let io;

const quizzes = {};

module.exports = {
  init,
  getIo
};

function init(http) {
  io = new Server(http, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      allowedHeaders: ["qwizard"],
    }
  });

  io.on("connection", function (socket) {
    console.log(`Socket ${socket.id} connected`);

    socket.on('disconnect', function () {
      console.log('disconnected');
      console.log(`Socket ${socket.id} disconnected`);
    });

    socket.on('sendMessage', (message) => {
      socket.to(socket.room).emit('message', message);
    });

    socket.on('joinRoom', (room) => {
      if (socket.room) {
        socket.leave(socket.room);
      }

      socket.room = room;
      socket.join(room);
    });

    socket.on('test_message', (room) => {

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
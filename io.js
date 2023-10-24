const jwt = require('jsonwebtoken');
const Quiz = require('./models/quiz');

let io;

const quizzes = {};

module.exports = {
    init,
    getIo
};

function init(http) {
    io = require('socket.io')(http);
    io.on("connection", function(socket) {
        console.log("test");
    });
}

function getIo() {
    return io;
}

function validateToken(token) {
    return new Promise(function(resolve) {
      jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) resolve(false);
        resolve(decoded.user);    
      });
    });
  }
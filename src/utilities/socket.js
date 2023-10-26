import { getToken } from "./users-service";

const socket = window.io();
let setGame = null;

export function registerSetGame(fn) {
    setGame = fn;
}

socket.on('update-game', function (game) {
    console.log(game)
    setGame(game);
});


export function getUsers(quizID, userName) {
    console.log('hello act');
    socket.emit('joinRoom', quizID, userName);
}

export function sendMessage(quizID, user, question) {
    socket.emit('sendMessage', { quizID, user, question });
}

export function allStuff(setAnswers) {
    socket.on('message', (message) => {
        setAnswers((answers) => [...answers, message]);
    });
}

export function joinGame(quizID) {
    socket.emit('joinGame', {
        quizID,
        token: getToken()
    });
}

export function joinLobby(quizID) {
    socket.emit('joinLobby', {
        quizID,
        token: getToken()
    });
}

export function leaveRoom(quizID) {
    socket.emit('leaveRoom', {
        quizID,
        token: getToken()
    })
}
import { getToken } from "./users-service";

const socket = window.io();
let setGame = null;
let setLobby = null;

export function registerSetLobby(fn) {
    setLobby = fn;
}

export function registerSetGame(fn) {
    setGame = fn;
}

socket.on('update-lobby', function (lobby) {
    setLobby(lobby);
});

socket.on('update-game', function (game) {
    setGame(game);
});

export function getUsers(quizID, userName) {
    console.log('hello act');
    socket.emit('joinRoom', quizID, userName);
}

export function sendMessage(quizID, user, question) {
    socket.emit('sendMessage', { quizID, user, question });
}

export function getActive() {
    socket.emit('get-active', getToken());
}

export function newGame(quizID) {
    socket.emit('newGame', quizID);
}

export function joinLobby(quizID) {
    socket.emit('joinLobby', {
        quizID,
        token: getToken()
    });
}

export function leaveLobby(quizID) {
    socket.emit('leaveLobby', {
        quizID,
        token: getToken()
    });
}
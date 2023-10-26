const socket = window.io();
let setGame = null;

export function registerSetGame(fn) {
    setGame = fn;
}

socket.on('update-game', function (game) {
    setGame([game]);
});


export function getUsers(quizID, userName) {
    console.log('hello act');
    socket.emit('joinRoom', quizID, userName);
}

export function sendMessage(quizID, user, question) {
    console.log(user);
    socket.emit('sendMessage', { quizID, user, question });
}

export function allStuff(setAnswers) {
    socket.on('message', (message) => {
        setAnswers((answers) => [...answers, message]);
    });
}

export function joinGame(quizID, userName) {
    socket.emit('joinGame', quizID, userName);
}
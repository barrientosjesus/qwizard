const socket = window.io();
let setGame = null;

export function registerSetGame(fn) {
    setGame = fn;
}

socket.on('update-game', function (game) {
    setGame(game);
});


export function getActive(quizID, userName) {
    console.log('hello act');
    socket.emit('joinRoom', quizID, userName);
}

export function sendMessage(user, question, answer) {
    console.log('hello');
    socket.emit('sendMessage', { question, answer, user });
}

export function allStuff(setAnswers) {
    socket.on('message', (message) => {
        setAnswers((answers) => [...answers, message]);
    });
}
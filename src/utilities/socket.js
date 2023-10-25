import io from 'socket.io-client';

let socket;
let ENDPOINT;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    ENDPOINT = 'http://localhost:3001';
} else {
    ENDPOINT = process.env.SOCKETPORT_DEV;
}

socket = io(ENDPOINT, {
    extraHeaders: {
        'qwizard': 'abcd',
    },
});

export default socket;

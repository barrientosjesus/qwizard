import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import * as socket from "../../utilities/socket";
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:3030";
let socket, selectedChatCompare;

socket = io(ENDPOINT, {
    extraHeaders: {
        'qwizard': 'abcd'
    }
});

export default function LobbyPage() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            setAnswers((answers) => [...answers, message]);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (question && answer) {
            socket.emit('sendMessage', { question, answer });
            setQuestion('');
            setAnswer('');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={question} placeholder="Your question" onChange={(event) => setQuestion(event.target.value)} />
                <input type="text" value={answer} placeholder="Your answer" onChange={(event) => setAnswer(event.target.value)} />
                <button type="submit">Send</button>
            </form>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index}>
                        {answer.question}: {answer.answer}
                    </li>
                ))}
            </ul>
        </div>
    );
}
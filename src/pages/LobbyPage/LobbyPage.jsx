import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne } from "../../utilities/quiz-api";
// import * as socket from "../../utilities/socket";
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:3001";
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
    const [room, setRoom] = useState('');
    const [quiz, setQuiz] = useState({});
    const quizID = useParams().quizID;
    const navigate = useNavigate();

    useEffect(() => {
        async function getQuiz() {
            const fetchedQuiz = await getOne(quizID);
            if (!fetchedQuiz) {
                navigate('/quizzes');
            }
            setQuiz(fetchedQuiz);
        }
        getQuiz();

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

    function handleJoin(evt) {
        evt.preventDefault();
        socket.emit('joinRoom', room);
    }

    return (
        <div>
            <h2>{quiz.title}</h2>
            <form onSubmit={handleJoin}>
                <input type="text" value={room} placeholder="ROOM CODE" onChange={(event) => setRoom(event.target.value)} />
                <button type="submit">Join</button>
            </form>
            <form onSubmit={handleSubmit}>
                <input type="text" value={question} placeholder="test question" onChange={(event) => setQuestion(event.target.value)} />
                <input type="text" value={answer} placeholder="test answer" onChange={(event) => setAnswer(event.target.value)} />
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
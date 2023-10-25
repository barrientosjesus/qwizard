import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne } from "../../utilities/quiz-api";
import socket from "../../utilities/socket";

export default function LobbyPage({ user }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [answers, setAnswers] = useState([]);
    const [room, setRoom] = useState('');
    const [quiz, setQuiz] = useState({});
    const quizID = useParams().quizID;
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('message', (message) => {
            setAnswers((answers) => [...answers, message]);
        });
        socket.emit('joinRoom', quizID, user.name);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (question && answer) {
            socket.emit('sendMessage', { question, answer, user: user.name });
            setQuestion('');
            setAnswer('');
        }
    };

    return (
        <div>
            <h2>{quiz.title}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={question} placeholder="test question" onChange={(event) => setQuestion(event.target.value)} />
                <input type="text" value={answer} placeholder="test answer" onChange={(event) => setAnswer(event.target.value)} />
                <button type="submit">Send</button>
            </form>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index}>
                        {answer.user}: {answer.question} - {answer.answer}
                    </li>
                ))}
            </ul>
        </div>
    );
}
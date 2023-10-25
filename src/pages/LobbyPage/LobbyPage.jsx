import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../../utilities/quiz-api";
import * as socket from "../../utilities/socket";

export default function LobbyPage({ user }) {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    const [quiz, setQuiz] = useState(null);
    const quizID = useParams().quizID;

    useEffect(() => {
        async function getQuiz() {
            const quizData = await getOne(quizID);
            setQuiz(quizData);
            console.log(quizData)
        }
        getQuiz();
    }, [user, quizID]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (question) {
            socket.sendMessage(user.name, question);
            setQuestion('');
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <h2>{quiz?.title || 'Error'}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={question} placeholder="test question" onChange={(event) => setQuestion(event.target.value)} />
                <button type="submit">Send</button>
            </form>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index}>
                        {answer.user}: {answer.question}
                    </li>
                ))}
            </ul>
        </div>
    );
}
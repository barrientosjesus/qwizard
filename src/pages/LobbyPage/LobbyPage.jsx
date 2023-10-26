import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getOne } from "../../utilities/quiz-api";
import * as socket from "../../utilities/socket";

export default function LobbyPage({ user }) {
    const [question, setQuestion] = useState('');
    const [quiz, setQuiz] = useState(null);
    const [lobby, setLobby] = useState(null);
    const quizID = useParams().quizID;
    const location = useLocation();

    useEffect(() => {
        socket.registerSetGame(setLobby);
        socket.joinLobby(quizID);
        async function getQuiz() {
            const cacheQuiz = await getOne(quizID);
            setQuiz(cacheQuiz);
        }
        getQuiz();
    }, [user, quizID]);

    useEffect(() => {
        return () => {
            socket.leaveRoom(quizID);
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (question) {
            socket.sendMessage(quizID, user.name, question);
            setQuestion('');
        }
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <h2>{quiz?.title || 'Error'}</h2>
            <div className="flex items-center">
                {lobby && lobby.map((l, index) => (
                    <div className="flex flex-col justify-center mx-3" key={index}>
                        <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${l.name}&radius=50&scale=100`} alt="avatar" />
                        {l.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
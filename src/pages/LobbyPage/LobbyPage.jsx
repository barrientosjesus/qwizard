import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../../utilities/quiz-api";
import Lobby from "../../components/Lobby/Lobby";
import * as socket from "../../utilities/socket";

export default function LobbyPage({ user }) {
    const [question, setQuestion] = useState('');
    const [quiz, setQuiz] = useState(null);
    const [lobby, setLobby] = useState(null);
    const quizID = useParams().quizID;

    useEffect(() => {
        socket.registerSetGame(setLobby);
        socket.joinLobby(quizID);
        async function getQuiz() {
            const cacheQuiz = await getOne(quizID);
            setQuiz(cacheQuiz);
        }
        getQuiz();
    }, [user, quizID]);

    // handle user navigating away from page
    useEffect(() => {
        return () => {
            socket.leaveLobby(quizID);
        };

    }, []);

    // handle user closing window
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            socket.leaveLobby(quizID);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    function handleSubmit(evt) {
        evt.preventDefault();
        alert('play button pressed!');
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="grid grid-cols-12 rounded-md justify-items-center grid-rows-3 h-1/2 w-1/2 bg-violet-500 shadow-md">
                <Lobby quiz={quiz} lobby={lobby} user={user} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
}
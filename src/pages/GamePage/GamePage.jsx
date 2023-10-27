import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../../utilities/quiz-api";
import Lobby from "../../components/Lobby/Lobby";
import Game from "../../components/Game/Game";
import * as socket from "../../utilities/socket";

export default function GamePage({ user }) {
    const [quiz, setQuiz] = useState(null);
    const [lobby, setLobby] = useState(null);
    const [game, setGame] = useState(null);
    const quizID = useParams().quizID;

    useEffect(() => {
        socket.registerSetLobby(setLobby);
        socket.registerSetGame(setGame);
        socket.joinLobby(quizID);
        async function getQuiz() {
            const cacheQuiz = await getOne(quizID);
            setQuiz(cacheQuiz);
        }
        getQuiz();
        
        if(user) socket.getActive();
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
        socket.newGame(quizID);
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="grid grid-cols-12 rounded-md justify-items-center grid-rows-3 h-1/2 w-1/2 bg-violet-500 shadow-md">
                { game?.inProgress ?
                    <Game game={game} quiz={quiz} />
                    :
                    <Lobby quiz={quiz} lobby={lobby} user={user} handleSubmit={handleSubmit} />
                }
            </div>
        </div>
    );
}
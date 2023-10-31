import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getOne } from "../../utilities/quiz-api";
import { getAllGamesForQuiz } from "../../utilities/game-api";
import GameDetailList from '../../components/GameDetailList/GameDetailList';
import QuizDetailForGame from '../../components/QuizDetailForUser/QuizDetailForGame';
import QuizDetailForUser from '../../components/QuizDetailForUser/QuizDetailForUser';

export default function QuizDetailPage() {
    const [quiz, setQuiz] = useState(null);
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const quizID = useParams().quizID;
    const averageScore = useRef(0);

    useEffect(() => {
        async function getQuiz() {
            const quizData = await getOne(quizID);
            averageScore.current = (quizData.averageScore / (quizData.questions.length * 10)) * 100;
            setQuiz(quizData);
        }

        async function getGames() {
            const gamesData = await getAllGamesForQuiz(quizID);
            setGames(gamesData);
        }

        getQuiz();
        getGames();
        setIsLoading(false);
    }, []);

    function handleSelectedGame(game) {
        setSelectedGame(game);
    }

    function handleUserSelect(user) {
        setSelectedUser(user);
    }

    return (
        <>
            {quiz &&
                <main className="z-20 w-full grid grid-cols-12 mt-5">
                    <section className="col-span-12 md:col-span-4 flex flex-col">
                        <div className="bg-violet-500 flex flex-col items-center m-3 p-3 rounded-lg shadow-lg">
                            <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${quiz.user.name}&radius=50&scale=100&size=64`} alt="avatar" />
                            <p className="text-2xl text-white"><em>{quiz.user.name}</em></p>
                            <p className="text-lg text-white"><small><em>Created: {quiz.formattedDate}</em></small></p>
                            <p className="text-lg text-white">{quiz.description}</p>
                            <small className="text-white">Average Score: {quiz.averageScore}</small>
                            <progress className="progress progress-secondary w-3/4" value={averageScore.current} max="100"></progress>
                            <span className="text-white">High Score: {quiz.highScore.playerName}</span>
                            <div className="text-white">Category: <strong>{quiz.category}</strong></div>
                        </div>
                        {selectedGame && <QuizDetailForGame selectedGame={selectedGame} handleUserSelect={handleUserSelect} />}
                        {selectedUser && <QuizDetailForUser selectedUser={selectedUser} />}
                    </section>
                    <section className="flex flex-col col-span-12 md:col-span-8 my-3">
                        <p className='text-violet-500 font-bold text-5xl text-center drop-shadow-md'>{quiz.title}</p>
                        {games.length ?
                            <table className="table table-xs bg-violet-500 text-white shadow-lg mt-5">
                                <thead>
                                    <tr>
                                        <th className="text-center text-white"></th>
                                        <th className="text-center text-white">Winner</th>
                                        <th className="text-center text-white">Players</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isLoading ?
                                        games.map((game, index) => (
                                            <GameDetailList game={game} key={index} row={index + 1} handleSelectedGame={handleSelectedGame} />
                                        ))
                                        :
                                        <tr>
                                            <th className="text-center"><span className="loading loading-dots loading-sm text-white"></span></th>
                                            <td className="text-center"><span className="loading loading-dots loading-sm text-white"></span></td>
                                            <td className="text-center"><span className="loading loading-dots loading-sm text-white"></span></td>
                                            <td className="text-center"><span className="loading loading-dots loading-sm text-white"></span></td>
                                            <td className="text-center"><span className="loading loading-dots loading-sm text-white"></span></td>
                                            <td className="text-center"><span className="loading loading-dots loading-sm text-white"></span></td>
                                        </tr>
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th className="text-center text-white"></th>
                                        <th className="text-center text-white">Winner</th>
                                        <th className="text-center text-white">Players</th>
                                    </tr>
                                </tfoot>
                            </table>
                            :
                            <p className='text-violet-500 font-bold text-3xl text-center drop-shadow-md'>No Quizzes Have Been Done</p>
                        }
                    </section>
                </main>
            }
        </>
    );
}
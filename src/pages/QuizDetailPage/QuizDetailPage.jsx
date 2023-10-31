import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getOne } from "../../utilities/quiz-api";
import { getAllGamesForQuiz } from "../../utilities/game-api";
import GameDetailList from '../../components/GameDetailList/GameDetailList';

export default function QuizDetailPage() {
    const [quiz, setQuiz] = useState(null);
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState(null);
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
                        {selectedGame &&
                            <table className="table table-xs bg-violet-500 grid grid-cols-3 items-center place-self-center w-1/2 p-3 shadow-lg">
                                <thead className='col-span-3'>
                                    <tr className='grid grid-cols-3'>
                                        <th></th>
                                        <th className="text-center text-white">Player</th>
                                        <th className="text-center text-white">Score</th>
                                    </tr>
                                </thead>
                                <tbody className='col-span-3'>
                                    {selectedGame.players.map((player, index) => (
                                        <tr className='grid grid-cols-3 justify-items-center items-center' key={index}>
                                            <td><img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${player.name}&radius=50&scale=100&size=24`} alt="avatar" /></td>
                                            <td className="text-center text-white">{player.name}</td>
                                            <td className="text-center text-white">{player.score.reduce((acc, val) => acc + val, 0).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className='col-span-3'>
                                    <tr className='grid grid-cols-3'>
                                        <th></th>
                                        <th className="text-center text-white">Player</th>
                                        <th className="text-center text-white">Score</th>
                                    </tr>
                                </tfoot>
                            </table>
                        }
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
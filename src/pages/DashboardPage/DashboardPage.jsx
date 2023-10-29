import { useState, useEffect } from "react";
import { getAllGames } from '../../utilities/game-api';
import GameList from "../../components/GameList/GameList";

export default function DashboardPage({ user }) {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function getGames() {
            const games = await getAllGames();
            setGames(games);
        }
        getGames();
    }, []);

    return (
        <main className="z-20 w-full grid grid-cols-12 mt-5">
            <section className="col-span-4 flex flex-col">
                <div className="bg-violet-500 flex flex-col items-center m-3 rounded-lg">
                    <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}&radius=50&scale=100&size=64`} alt="avatar" />
                    <p className="text-2xl text-white"><em>{user.name}</em></p>
                    <p className="text-lg text-white"><em>Quizzes Done: {games.length}</em></p>
                </div>
            </section>
            <section className="flex flex-col col-span-8 overflow-x-auto my-3">
                <table className="table table-xs bg-violet-500 text-white">
                    <thead>
                        <tr>
                            <th className="text-center text-white"></th>
                            <th className="text-center text-white">Winner</th>
                            <th className="text-center text-white">Quiz</th>
                            <th className="text-center text-white">Quiz Highest Score</th>
                            <th className="text-center text-white">My Score</th>
                            <th className="text-center text-white"># of Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games && games.map((game, index) => (
                            <GameList game={game} key={index} row={index + 1} user={user} />
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="text-center text-white"></th>
                            <th className="text-center text-white">Winner</th>
                            <th className="text-center text-white">Quiz</th>
                            <th className="text-center text-white">Quiz Highest Score</th>
                            <th className="text-center text-white">My Score</th>
                            <th className="text-center text-white"># of Players</th>
                        </tr>
                    </tfoot>
                </table>
            </section>

        </main>
    );
};
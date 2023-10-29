import { useNavigate } from 'react-router-dom';

export default function EndGameScreen({ game }) {
    const navigate = useNavigate();
    const sortedPlayers = game.players.sort((playerA, playerB) => playerB.score - playerA.score);

    function handleClick(evt) {
        evt.preventDefault();
        navigate('/quizzes');
    }

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="grid grid-cols-12 grid-rows-6 rounded-md justify-items-center h-1/2 w-1/2 bg-violet-500 shadow-md">
                <div className="row-span-1 col-span-12 flex items-center">
                    <p className="text-5xl text-white font-bold">Game Over</p>
                </div>
                <div className="col-span-12 row-span-4 flex flex-wrap items-center">
                    {sortedPlayers && sortedPlayers.map((p, index) => (
                        <div className="flex flex-col items-center" key={index}>
                            <span className="text-3xl text-white">{p.score}</span>
                            <div className="flex flex-col justify-center items-center mx-3" key={index}>
                                <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${p.name}&radius=50&scale=100`} className='h-[32px] w-[32px] md:h-[64px] md:w-[64px]' alt="avatar" key={index} />
                                <span className="text-white">{p.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-span-12 flex items-center mb-3">
                    <button className="btn btn-primary" onClick={handleClick}>Exit</button>
                </div>
            </div>
        </div >
    );
}
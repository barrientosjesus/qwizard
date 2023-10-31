export default function QuizDetailForGame({ selectedGame, handleUserSelect }) {
    return (
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
                    <tr className='grid grid-cols-3 justify-items-center items-center hover:bg-slate-100/30 hover:cursor-pointer' key={index} onClick={() =>handleUserSelect(player)} >
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
    );
}
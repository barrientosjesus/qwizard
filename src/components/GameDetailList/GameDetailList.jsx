export default function GameDetailList({ game, row, handleSelectedGame }) {
    const sortedPlayers = game.players.sort((playerA, playerB) => playerB.totalScore - playerA.totalScore);

    return (
        <tr onClick={() => handleSelectedGame(game)} className="hover:bg-slate-100/30 hover:cursor-pointer">
            <th className="text-center">{row}</th>
            <td className="text-center">{sortedPlayers[0].name}</td>
            <td className="flex items-center justify-center">
            {game.players.map((player, index) => (
                    <div className="flex flex-col items-center px-2" key={index}>
                        <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${player.name}&radius=50&scale=100&size=24`} alt="avatar" />
                        <span className="truncate">{player.name}</span>
                    </div>
            ))}
            </td>
        </tr>
    );
}
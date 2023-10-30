export default function GameList({ game, row, user }) {
    const sortedPlayers = game.players.sort((playerA, playerB) => playerB.totalScore - playerA.totalScore);
    const myScore = game.players.find(p => p.userID === user._id).totalScore

    return (
        <tr>
            <th className="text-center">{row}</th>
            <td className="text-center">{sortedPlayers[0].name}</td>
            <td className="text-center">{game.quiz.title}</td>
            <td className="text-center">{game.quiz.highScore.playerName}: {game.quiz.highScore.score}</td>
            <td className="text-center">{myScore}</td>
            <td className="text-center">{game.players.length}</td>
        </tr>
    );
}
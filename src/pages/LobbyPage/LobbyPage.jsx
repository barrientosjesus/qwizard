import { useParams } from "react-router-dom";

export default function LobbyPage() {
    const quizID = useParams().quizID;

    return (
        <h1>LobbyPage</h1>
    );
}
import { useParams } from "react-router-dom";
import * as socket from "../../utilities/socket";

export default function LobbyPage() {
    const quizID = useParams().quizID;

    

    return (
        <h1>LobbyPage</h1>
    );
}
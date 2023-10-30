import "./QuestionMarkBG.css"

export default function QuestionMarkBG() {

    function randomStyles(){
        return {
            fontSize: (Math.floor(Math.random() * 7) + 5) + "rem",
            animationDelay: Math.floor(Math.random() * 14) + "s",
            animationDuration: (Math.floor(Math.random() * 15) + 30) + "s",
        }
    }

    return (
        <div className="area QuestionMarkBG" >
            <ul className="circles">
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
                <li className="font-bold qm-bg text-9xl" style={randomStyles()}>?</li>
            </ul>
        </div >
    );
}
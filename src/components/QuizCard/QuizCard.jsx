import { useNavigate } from "react-router-dom";


export default function QuizCard({ quiz, user, handleDeleteQuiz }) {
    const navigate = useNavigate();

    const averageScore = Math.floor((quiz.averageScore / quiz.questions.length) * 100);

    function handlePlayClick() {
        if (user) {
            navigate(`/lobby/${quiz._id}`);
        } else {
            navigate('/login');
        }
    }

    return (
        <div className="card w-80 h-auto bg-base-100 shadow-xl m-5">
            <div className="card-body grid grid-rows-4">
                <section className="grid auto-rows-auto">
                    <h2 className="card-title"><em>{quiz.title}</em></h2>
                    <small><em>Created by {quiz.user.name} on {quiz.formattedDate}</em></small>
                </section>
                <section className="grid auto-rows-auto">
                    <small>Average Score: {averageScore}%</small>
                    <progress className="progress progress-secondary" value={averageScore} max="100"></progress>
                    <span>High Score: {quiz.highScore.playerName}</span>
                    <div>Category: <strong>{quiz.category}</strong></div>
                </section>
                <section className="w-full flex flex-wrap">
                    <div className='tooltip tooltip-hover tooltip-bottom' data-tip={quiz.description}>
                        <p className="line-clamp-3">{quiz.description}</p>
                    </div>
                </section>
                <div className="card-actions justify-center items-center">
                    <button onClick={handlePlayClick} className="btn btn-primary">Play Now!</button>
                    {user && user._id === quiz.user._id &&
                        <button onClick={() => handleDeleteQuiz(quiz._id)} className="btn btn-error">Delete</button>
                    }
                </div>
            </div>
        </div>
    );
}
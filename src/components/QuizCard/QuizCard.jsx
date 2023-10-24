export default function QuizCard({ quiz, user }) {
    return (
        <div className="card w-64 bg-base-100 shadow-xl m-5">
            <div className="card-body grid auto-rows-auto">
                <section className="grid auto-rows-auto">
                    <h2 className="card-title"><em>{quiz.title}</em></h2>
                    <small><em>Created by {quiz.user.name}</em></small>
                </section>
                <section className="grid auto-rows-auto">
                    <small>Average Score: 72%</small>
                    <progress className="progress progress-secondary" value="80" max="100"></progress>
                    <span>High Score: Chewbacca</span>
                </section>
                <div>Category: <strong>{quiz.category}</strong></div>
                <section>
                    <p>{quiz.description}</p>
                </section>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Play Now!</button>
                    {user && user.id === quiz.user.id &&
                        <button className="btn btn-error">Delete</button>
                    }
                </div>
            </div>
        </div>
    );
}
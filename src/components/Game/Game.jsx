import { useState } from 'react';

export default function Game({ game, quiz }) {
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    console.log(game, quiz);

    function handleAnswerClick(answerIndex) {
        if (selectedAnswerIndex !== null) {
            return;
        }

        setSelectedAnswerIndex(answerIndex);

        const currentQuestion = quiz.questions[game.currentQuestionIndex];
        const selectedAnswer = currentQuestion.answers[answerIndex];

        if (selectedAnswer.isCorrect) {
            setScore(score + 1);
        }
    };

    const answerClass = (answerIndex) => {
        if (selectedAnswerIndex !== null) {
            const currentQuestion = quiz.questions[game.currentQuestionIndex];
            const selectedAnswer = currentQuestion.answers[answerIndex];

            if (answerIndex === selectedAnswerIndex) {
                return selectedAnswer.isCorrect ? 'bg-green-500' : 'bg-red-500';
            }
        }

        return '';
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="grid grid-cols-12 grid-rows-5 rounded-md justify-items-center h-1/2 w-1/2 bg-violet-500 shadow-md">
                <div className='col-span-12 bg-slate-100 rounded-md p-5 m-5 w-11/12 flex items-center justify-center'>{quiz.questions[game.currentQuestionIndex].question}</div>
                {quiz.questions[game.currentQuestionIndex].answers.map((answer, index) => (
                    <button
                        key={index}
                        className={`${answerClass(index) || 'bg-slate-100'
                            } col-span-12 rounded-md p-5 m-5 w-11/12 flex items-center justify-center hover:bg-violet-400 cursor-pointer`}
                        onClick={() => handleAnswerClick(index)}
                    >
                        {answer.text}
                    </button>
                ))}
            </div>
        </div>
    );
}
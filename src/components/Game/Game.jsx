import { useState, useEffect, useRef } from 'react';

export default function Game({ game, quiz, handleScoreUpdate }) {
    const [answered, setAnswered] = useState(false);
    const [timer, setTimer] = useState(10);
    const intervalRef = useRef(null);

    useEffect(() => {
        setAnswered(false);
        if (game.currentQuestionIndex !== -1) {
            setTimer(10);
        }
    }, [game.currentQuestionIndex]);

    useEffect(() => {
        if (timer > 0 && !answered) {
            intervalRef.current = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        if (timer === 0 && !answered) {
            setAnswered(true);
            handleScoreUpdate(0);
        }

        return () => {
            clearInterval(intervalRef.current);
        };

    }, [timer, answered]);

    function handleAnswerClick(answerIndex) {
        if (answered) {
            return;
        }

        const currentQuestion = quiz.questions[game.currentQuestionIndex];
        const selectedAnswer = currentQuestion.answers[answerIndex];

        if (selectedAnswer.isCorrect) {
            handleScoreUpdate(1);
        } else {
            handleScoreUpdate(0);
        }
        setAnswered(true);
    }

    function answerClass(answerIndex) {
        if (answered) {
            const currentQuestion = quiz.questions[game.currentQuestionIndex];
            const selectedAnswer = currentQuestion.answers[answerIndex];
            return selectedAnswer.isCorrect ? 'bg-green-500' : 'bg-red-500';
        }
        return '';
    };

    const currentQuestionIndex = game.currentQuestionIndex;

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="grid grid-cols-12 grid-rows-7 rounded-md justify-items-center max-h-max max-w-max bg-violet-500 shadow-md">
                <div className="radial-progress bg-slate-100 col-span-12 mt-5 text-violet-500 border-2 border-white" style={{ "--value": Math.floor((timer / 10) * 100) }}>{timer}</div>
                <div className='col-span-12 rounded-md p-5 m-5 w-11/12 flex items-center justify-center text-white text-7xl'>{quiz.questions[currentQuestionIndex].question}</div>
                {quiz.questions[currentQuestionIndex].answers.map((answer, index) => (
                    <button
                        key={index}
                        className={`${answerClass(index) || 'bg-slate-100'
                            } col-span-12 rounded-md p-5 m-5 w-11/12 flex items-center justify-center hover-bg-violet-400 cursor-pointer`}
                        onClick={() => handleAnswerClick(index)}
                    >
                        {answer.text}
                    </button>
                ))}
                <div className='col-span-12 flex flex-wrap mb-2'>
                    {game.players && game.players.map((p, index) => (
                        <div className="flex flex-col items-center">
                            <div className={p.hasAnswered && 'tooltip tooltip-open tooltip-bottom'} data-tip="Done!">
                                <div className="flex flex-col justify-center items-center mx-3" key={index}>
                                    <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${p.name}&radius=50&scale=100&size=32`} alt="avatar" key={index} />
                                    <span className="text-white">{p.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
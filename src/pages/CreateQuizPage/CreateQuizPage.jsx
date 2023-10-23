import { useState } from "react";
import { createQuiz } from "../../utilities/quiz-api";
import CreateQuizForm from "../../components/CreateQuizForm/CreateQuizForm";
import CreateQuestionForm from "../../components/CreateQuestionForm/CreateQuestionForm";
import QuestionFormList from "../../components/QuestionFormList/QuestionFormList";

export default function NewQuizPage() {
    const [quizData, setQuizData] = useState({
        title: "",
        category: "",
        description: "",
        questions: []
    });

    const [questionData, setQuestionData] = useState({
        question: "",
        answers: [
            {
                answer: '',
                isCorrect: false
            },
            {
                answer: '',
                isCorrect: false
            },
            {
                answer: '',
                isCorrect: false
            },
            {
                answer: '',
                isCorrect: false
            }
        ]
    });

    async function handleCreateQuiz(evt) {
        evt.preventDefault();
        console.log(quizData);
        alert('creating quiz!');
    }

    function handleCreateQuestion(evt) {
        evt.preventDefault();
        setQuizData((prevData) => ({
            ...prevData,
            questions: [...prevData.questions, questionData]
        }));
        setQuestionData({
            question: "",
            answers: [
                {
                    answer: "",
                    isCorrect: false
                },
                {
                    answer: "",
                    isCorrect: false
                },
                {
                    answer: "",
                    isCorrect: false
                },
                {
                    answer: "",
                    isCorrect: false
                }
            ]
        });

        console.log(quizData);
    }

    function handleQuizChange(evt) {
        setQuizData({ ...quizData, [evt.target.name]: evt.target.value });
    }

    function handleQuestionChange(evt) {
        const { name, value, type, checked } = evt.target;

        if (type === "text") {
            if (name === "question") {
                setQuestionData({ ...questionData, question: value });
            } else {
                const answerIndex = parseInt(name.split("-")[1], 10);
                const updatedAnswers = [...questionData.answers];
                updatedAnswers[answerIndex].answer = value;
                setQuestionData({ ...questionData, answers: updatedAnswers });
            }
        } else if (type === "radio") {
            const answerIndex = parseInt(name.split("-")[1], 10);
            const updatedAnswers = [...questionData.answers];

            updatedAnswers.forEach((answer, index) => {
                answer.isCorrect = index === answerIndex && checked;
            });

            setQuestionData({ ...questionData, answers: updatedAnswers });
        }
        console.log(questionData);
    }

    return (
        <div className="z-20 w-full grid grid-cols-12">
            <CreateQuizForm
                quizData={quizData}
                handleQuizChange={handleQuizChange}
                handleCreateQuiz={handleCreateQuiz}
            />
            <CreateQuestionForm
                questionData={questionData}
                handleQuestionChange={handleQuestionChange}
                handleCreateQuestion={handleCreateQuestion}
            />
            <QuestionFormList questions={quizData.questions} />
        </div>
    );
}
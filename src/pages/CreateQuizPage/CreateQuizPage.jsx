import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../../utilities/quiz-api";
import CreateQuizForm from "../../components/CreateQuizForm/CreateQuizForm";
import CreateQuestionForm from "../../components/CreateQuestionForm/CreateQuestionForm";

export default function NewQuizPage() {
    const navigate = useNavigate();
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
                text: '',
                isCorrect: false
            },
            {
                text: '',
                isCorrect: false
            },
            {
                text: '',
                isCorrect: false
            },
            {
                text: '',
                isCorrect: false
            }
        ]
    });

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
                    text: "",
                    isCorrect: false
                },
                {
                    text: "",
                    isCorrect: false
                },
                {
                    text: "",
                    isCorrect: false
                },
                {
                    text: "",
                    isCorrect: false
                }
            ]
        });
    }

    async function handleCreateQuiz(evt) {
        evt.preventDefault();
        const quiz = await createQuiz(quizData);
        navigate('/quizzes');
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
                updatedAnswers[answerIndex].text = value;
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
    }

    function isEmpty() {
        return !!quizData.questions.length;
    }

    function handleDeleteQuestion(questionIndex) {
        const updatedQuestions = [...quizData.questions];

        updatedQuestions.splice(questionIndex, 1);

        setQuizData((prevData) => ({
            ...prevData,
            questions: updatedQuestions,
        }));
    }

    return (
        <div className="z-20 w-full h-10/12 grid grid-cols-12">
            <CreateQuizForm
                quizData={quizData}
                handleQuizChange={handleQuizChange}
                handleCreateQuiz={handleCreateQuiz}
                isEmpty={isEmpty()}
            />
            <CreateQuestionForm
                questionData={questionData}
                handleQuestionChange={handleQuestionChange}
                handleCreateQuestion={handleCreateQuestion}
                questions={quizData.questions}
                handleDeleteQuestion={handleDeleteQuestion}
            />
        </div>
    );
}
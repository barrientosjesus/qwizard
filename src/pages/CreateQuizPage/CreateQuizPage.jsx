import { useState } from "react";
import { createQuiz } from "../../utilities/quiz-api";

export default function NewQuizPage() {
    const [quizData, setQuizData] = useState({
        title: "",
        category: "",
        description: "",
        questions: []
    });

    const [questionData, setQuestionData] = useState([{
        question: "",
        answers: []
    }]);

    const [answerData, setAnswerData] = useState([{
        answer: '',
        isCorrect: false
    }]);

    const addAnswerInput = () => {
        if (answerData.length < 4) {
            setAnswerData([...answerData, { answer: '', isCorrect: false }]);
        }
    };

    async function handleCreateQuiz(evt) {
        evt.preventDefault();
        alert('creating quiz!');
    }

    function handleQuizChange(evt) {
        setQuizData({ ...quizData, [evt.target.name]: evt.target.value });
    }

    function handleQuestionChange(evt) { }

    const handleAnswerChange = (index, field, value) => {
        const newAnswers = [...answerData];
        newAnswers[index][field] = value;
        setAnswerData(newAnswers);
      };

    return (
        <div className="z-20 w-full h-full grid grid-cols-12">
            <form className=" col-span-4 my-3" onSubmit={handleCreateQuiz}>
                <aside className="col-start-1 col-end-5 flex rounded-md flex-col w-auto md:w-3/4 items-center justify-center bg-slate-500 mx-2">
                    <section className="max-h-max flex flex-col items-center">
                        <label className='text-white'>Qwiz Title</label>
                        <input type="text" name="title" className='input input-bordered w-3/4 input-secondary max-w-full' value={quizData.title} onChange={handleQuizChange} required />
                        <label className='text-white'>Category</label>
                        <select name="category" value={quizData.category} onChange={handleQuizChange} className="select select-bordered w-3/4 max-w-full">
                            <option value="General">General</option>
                            <option value="Movies">Movies</option>
                            <option value="TV Shows">TV Shows</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Programming">Programming</option>
                            <option value="People">People</option>
                            <option value="Misc">Misc</option>
                        </select>
                        <label className='text-white'>Description</label>
                        <textarea name="description" placeholder="Describe your qwiz" className="resize-none textarea textarea-bordered textarea-sm w-3/4 max-w-full" value={quizData.description} onChange={handleQuizChange} />
                        <button type="submit" className="btn btn-sm bg-violet-500 my-2">Create</button>
                    </section>
                </aside>
            </form>
            <section className="col-start-5 col-end-13 max-h-max rounded-md grid grid-cols-12 grid-rows-2 mx-2">
                <form className="col-span-12 max-h-max bg-slate-500 flex flex-col items-start">
                    <input type="text" name="question" placeholder="Type your question" className='w-full input input-bordered input-secondary max-w-full col-span-12' value={questionData.question} onChange={handleQuestionChange} required />
                    <input type="text" name="answer" placeholder="Type an answer" className='input input-bordered w-5/6 input-secondary max-w-full col-span-10' value={questionData.description} onChange={handleQuestionChange} required />
                    <button type="submit" className="btn btn-sm bg-violet-500 my-2 self-center">Create</button>
                </form>
                <section className="col-start-5 max-h-max col-end-13 rounded-md flex flex-col items-center mx-2 my-2 bg-slate-500">
                    <ul>
                        <li>Stuff</li>
                        <li>Stuff</li>
                        <li>Stuff</li>
                        <li>Stuff</li>
                        <li>Stuff</li>
                    </ul>
                </section>
            </section>
        </div>
    );
}
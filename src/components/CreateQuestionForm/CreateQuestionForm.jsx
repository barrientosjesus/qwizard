import QuestionFormList from '../QuestionFormList/QuestionFormList';

export default function CreateQuestionForm({ questionData, handleQuestionChange, handleCreateQuestion, questions, handleDeleteQuestion }) {

    function isAtleastOneSelected() {
        return questionData.answers.some((a) => a.isCorrect);
    }

    return (
        <>
            <section className="col-span-12 md:col-span-8 grow mx-2 my-3 bg-violet-500 rounded-md">
                <form id="question-form" onSubmit={handleCreateQuestion} className="col-span-12 mb-10">
                    <div className='w-full p-3'>
                        <input
                            type="text"
                            name="question"
                            placeholder="Type your question"
                            className="w-full input input-bordered input-secondary max-w-full col-span-12"
                            value={questionData.question}
                            onChange={handleQuestionChange}
                            required
                        />
                    </div>
                    {questionData.answers.map((a, index) => (
                        <div key={index} className="flex m-3 my-5 col-span-12 justify-center">
                            <div className="w-full relative">
                                <input
                                    type="text"
                                    name={`text-${index}`}
                                    placeholder="Type an answer"
                                    className="input input-bordered w-11/12 border-white text-white input-secondary max-w-full bg-violet-500 placeholder:text-slate-300/50"
                                    value={a.text}
                                    onChange={(evt) => handleQuestionChange(evt)}
                                    required
                                />
                                <div className="absolute flex top-0 left-12 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="text-white bg-violet-500">Answer #{index + 1}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <input
                                    type="radio"
                                    name={`answer-${index}`}
                                    className="radio checked:bg-violet-500"
                                    onChange={(evt) => handleQuestionChange(evt)}
                                    checked={a.isCorrect}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="col-span-12 flex flex-col w-full items-center justify-center">
                        <button
                            type="submit"
                            className={`btn btn-sm bg-slate-100 hover:bg-violet-300 text-violet-500 my-2 self-center ${isAtleastOneSelected() ? '' : 'btn-disabled'}`}
                        >
                            Create
                        </button>
                    </div>
                </form>
                <QuestionFormList questions={questions} handleDeleteQuestion={handleDeleteQuestion} />
            </section>
        </>
    );
}
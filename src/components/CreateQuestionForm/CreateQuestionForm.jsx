export default function CreateQuestionForm({ questionData, handleQuestionChange, handleCreateQuestion }) {

    function isAtleastOneSelected() {
        return questionData.answers.some((a) => a.isCorrect);
    }

    return (
        <section className="col-start-5 col-end-13 grid grid-cols-12 mx-2 my-3 max-h-max">
            <form onSubmit={handleCreateQuestion} className="col-span-12 grid-cols-12 max-h-max bg-violet-500 grid grid-rows-6 items-start rounded-md">
                <input
                    type="text"
                    name="question"
                    placeholder="Type your question"
                    className="w-11/12 input input-bordered input-secondary max-w-full col-span-12 m-3"
                    value={questionData.question}
                    onChange={handleQuestionChange}
                    required
                />
                {questionData.answers.map((a, index) => (
                    <div key={index} className="flex m-3 col-span-12 justify-center">
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
                            <div className="absolute flex top-0 left-1/4 md:left-12 transform -translate-x-1/2 -translate-y-1/2">
                                <span className="text-white bg-violet-500">Answer #{index + 1}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label>Correct</label>
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
                        className={`btn btn-sm bg-violet-500 my-2 self-center ${isAtleastOneSelected() ? '' : 'btn-disabled'}`}
                    >
                        Create
                    </button>
                </div>
            </form>
        </section>
    );
}
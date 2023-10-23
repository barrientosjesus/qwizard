export default function CreateQuestionForm({ questionData, handleQuestionChange, handleCreateQuestion }) {

    return (
        <section className="col-start-5 col-end-13 grid grid-cols-12 mx-2 my-3">
            <form onSubmit={handleCreateQuestion} className="col-span-12 max-h-max bg-violet-500 flex flex-col items-start rounded-md">
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
                    <div key={index} className="flex m-3">
                        <div className="max-w-full relative">
                            <input
                                type="text"
                                name={`answer-${index}`}
                                placeholder="Type an answer"
                                className="input input-bordered border-white text-white input-secondary max-w-full col-span-10 bg-violet-500 placeholder:text-slate-300/50"
                                value={a.answer}
                                onChange={(evt) => handleQuestionChange(evt)}
                                required
                            />
                            <div className="absolute flex top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                                <span className="text-white bg-violet-500">Answer #{index + 1}</span>
                            </div>
                        </div>
                        <label>Is Correct:</label>
                        <input
                            type="radio"
                            name={`answer-${index}`}
                            className="radio checked:bg-violet-500"
                            onChange={(evt) => handleQuestionChange(evt)}
                            checked={a.isCorrect}
                        />
                    </div>
                ))}
                <button type="submit" className="btn btn-sm bg-violet-500 my-2 self-center">
                    Create
                </button>
            </form>
        </section>
    );
}
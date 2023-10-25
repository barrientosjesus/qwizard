export default function CreateQuizForm({ quizData, handleQuizChange, handleCreateQuiz, isEmpty }) {
    console.log(isEmpty);
    return (
        <form className="col-span-4 my-3" onSubmit={handleCreateQuiz}>
            <aside className="col-start-1 col-end-5 flex rounded-md flex-col shadow-lg w-auto items-center justify-center bg-violet-500 mx-2">
                <section className="max-h-max flex flex-col items-center py-10">
                    <div className="max-w-full relative">
                        <input type="text" name="title" placeholder="Qwiz Title" className='placeholder:text-slate-300/50 input w-full p-3 bg-violet-500 input-bordered border-white text-white' value={quizData.title} onChange={handleQuizChange} required />
                        <div className="absolute flex top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                            <span className='text-white bg-violet-500'>Qwiz Title</span>
                        </div>
                    </div>
                    <label className='text-white'>Category</label>
                    <select name="category" value={quizData.category} onChange={handleQuizChange} className="select select-bordered w-3/4 max-w-full">
                        <option className="text-slate-500/50" value="" disabled>Pick One</option>
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
                    <button
                        type="submit"
                        className={`btn btn-sm bg-violet-500 my-2 ${isEmpty ? '' : 'btn-disabled'}`}
                    >
                        Create
                    </button>
                </section>
            </aside>
        </form>
    );
}
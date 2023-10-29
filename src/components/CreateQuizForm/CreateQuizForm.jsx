export default function CreateQuizForm({ quizData, handleQuizChange, handleCreateQuiz, isEmpty }) {
    return (
        <form className="col-span-4 my-3" onSubmit={handleCreateQuiz}>
            <aside className="flex rounded-md flex-col shadow-lg w-auto items-center justify-center bg-violet-500 mx-2">
                <section className="max-h-max flex flex-col items-center py-5 w-full">
                    <div className="w-3/4 max-w-full relative">
                        <input type="text" name="title" placeholder="Qwiz Title" className='placeholder:text-slate-300/50 input w-full p-3 bg-violet-500 input-bordered border-white text-white' value={quizData.title} onChange={handleQuizChange} required />
                        <div className="absolute flex top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                            <span className='text-white bg-violet-500'>Qwiz Title</span>
                        </div>
                    </div>
                    <div className="w-3/4 max-w-full relative m-3 mt-5">
                        <select name="category" value={quizData.category} onChange={handleQuizChange} placeholder="Pick Category" className="select select-bordered placeholder:text-slate-200/50 w-full p-3 bg-violet-500 border-white text-white">
                            <option className="text-slate-200/50" value="" disabled>Pick Category</option>
                            <option value="General">General</option>
                            <option value="Movies">Movies</option>
                            <option value="TV Shows">TV Shows</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Programming">Programming</option>
                            <option value="People">People</option>
                            <option value="Misc">Misc</option>
                        </select>
                        <div className="absolute flex top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                            <span className='text-white bg-violet-500'>Category</span>
                        </div>
                    </div>
                    <div className="w-3/4 max-w-full relative m-3">
                        <textarea name="description" placeholder="Describe your qwiz" className="resize-none textarea textarea-bordered textarea-sm placeholder:text-slate-200/50 w-full p-3 bg-violet-500 border-white text-white" value={quizData.description} onChange={handleQuizChange} />
                        <div className="absolute flex top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                            <span className='text-white bg-violet-500'>Description</span>
                        </div>
                    </div>
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
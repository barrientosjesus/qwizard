export default function QuizFilter({ setFilterText }) {
    return (
        <section className="col-span-12 md:col-span-3 max-h-max">
            <div className="rounded-md m-3 py-5 bg-violet-500 shadow-lg">
            <h1 className="text-center text-white m-2 text-3xl">QuizFilter</h1>
            <ul className="w-full flex flex-col items-center">
                <li className="m-3 w-full flex flex-col items-center">
                    <div className="relative w-11/12">
                        <input
                            type="text"
                            placeholder="Search for Qwiz"
                            className="input input-bordered w-11/12 border-white text-white input-secondary focus:border-slate-100 max-w-full bg-violet-500/90 placeholder:text-slate-300/50"
                            onChange={(evt) => setFilterText(evt.target.value)}
                        />
                        <div className="absolute flex top-0 left-12 md:left-1/4 lg:left-12 transform -translate-x-1/2 -translate-y-1/2">
                            <span className="text-white bg-violet-500">Search</span>
                        </div>
                    </div>
                </li>
                <li className="m-3 w-full flex flex-col items-center">
                    <div className="relative w-11/12">
                        <select id="categoryID" name="category" onChange={(evt) => setFilterText(evt.target.value)} className="select select-bordered w-11/12 border-white text-white input-secondary focus:border-slate-100 max-w-full bg-violet-500/90 placeholder:text-slate-300/50">
                            <option className="text-slate-300/50" value="" disabled>Filter Category</option>
                            <option value="General">General</option>
                            <option value="Movies">Movies</option>
                            <option value="TV Shows">TV Shows</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Programming">Programming</option>
                            <option value="People">People</option>
                            <option value="Misc">Misc</option>
                        </select>
                        <div className="absolute flex top-0 left-12 md:left-1/4 lg:left-12 transform -translate-x-1/2 -translate-y-1/2">
                            <span className="text-white bg-violet-500">Category</span>
                        </div>
                    </div>
                </li>
                <li>
                    <button className="btn btn-white text-violet-500 hover:bg-violet-500 hover:text-white" onClick={() => setFilterText('')}>Reset Filter</button>
                </li>
            </ul>
            </div>
        </section>
    );
}
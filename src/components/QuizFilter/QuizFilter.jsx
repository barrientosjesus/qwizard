export default function QuizFilter({ setFilterText }) {
    return (
        <section className="col-span-3 rounded-md m-3 bg-violet-500">
            <h1>QuizFilter</h1>
            <ul>
                <li>
                    <label>Search</label>
                    <input type="text" onChange={(evt) => setFilterText(evt.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </li>
            </ul>
        </section>
    );
}
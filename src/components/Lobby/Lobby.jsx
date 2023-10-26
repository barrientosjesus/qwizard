export default function Lobby({ quiz, lobby, handleSubmit }) {
    return (
        <>
            {quiz ?
                <>
                    <div className="col-span-12 flex flex-col items-center m-4">
                        <div className="text-3xl text-white font-bold">{quiz?.title || 'Error'}</div>
                        <div className="text-xl text-white">{quiz?.category || 'Error'}</div>
                        <small className="text-white"><em>{quiz?.questions.length || 'Error'} Questions</em></small>
                    </div>
                    <div className="col-span-12 flex">
                        {lobby && lobby.map((l, index) => (
                            <div className="flex flex-col justify-center mx-3" key={index}>
                                <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${l.name}&radius=50&scale=100`} alt="avatar" key={index} />
                                {l.name}
                            </div>
                        ))}
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary shadow-lg col-span-12 self-end mb-8">Play!</button>
                </>
                :
                <div className="col-span-12 rounded-md m-3 bg-violet-500 flex flex-col items-center justify-center">
                    <span className="loading loading-dots loading-lg text-white"></span>
                </div>
            }
        </>
    );
}
export default function Lobby({ quiz, lobby, handleSubmit, user }) {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="grid grid-cols-12 rounded-md justify-items-center grid-rows-3 h-1/2 w-1/2 bg-violet-500 shadow-md">
                {quiz ?
                    <>
                        <div className="col-span-12 flex flex-col items-center m-4">
                            <div className="text-3xl text-white font-bold">{quiz?.title || 'Error'}</div>
                            <div className="text-xl text-white">{quiz?.category || 'Error'}</div>
                            <small className="text-white"><em>{quiz?.questions.length || 'Error'} Questions</em></small>
                        </div>
                        <div className="col-span-12 flex flex-wrap">
                            {lobby && lobby.map((u, index) => (
                                <div className="flex flex-col justify-center items-center mx-3" key={index}>
                                    <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${u.name}&radius=50&scale=100&size=64`} alt="avatar" key={index} />
                                    <span className="text-white">{u.name}</span>
                                </div>
                            ))}
                        </div>
                        {user?._id === lobby[0]?._id ?
                            <button onClick={handleSubmit} className="btn btn-primary shadow-lg col-span-12 self-end mb-8">Play!</button>
                            :
                            <div className="col-span-12 self-end mb-8 text-white flex flex-col items-center">
                                <span className="loading loading-dots loading-lg text-white"></span>
                                <span>Waiting to Start</span>
                            </div>
                        }
                    </>
                    :
                    <div className="col-span-12 rounded-md m-3 bg-violet-500 flex flex-col items-center justify-center">
                        <span className="loading loading-dots loading-lg text-white"></span>
                    </div>
                }
            </div>
        </div>
    );
}
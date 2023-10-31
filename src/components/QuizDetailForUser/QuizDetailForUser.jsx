export default function QuizDetailForUser({ selectedUser }) {
    return (
        <table className="table table-xs bg-violet-500 grid grid-cols-2 items-center content-center place-self-center w-1/2 p-3 h-full m-0 md:max-h-max md:mt-3 shadow-lg">
            <thead className='col-span-2'>
                <tr className='grid grid-cols-2 items-center'>
                    <th>
                        <div className="flex flex-col items-center">
                            <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${selectedUser.name}&radius=50&scale=100&size=24`} alt="avatar" />
                            <small className="text-white">{selectedUser.name}</small>
                        </div>
                    </th>
                    <th className="text-center text-white">Score</th>
                </tr>
            </thead>
            <tbody className='col-span-2'>
                {selectedUser.score.map((score, index) => (
                    <tr className='grid grid-cols-2 justify-items-center items-center' key={index} >
                        <td className="text-center text-white">{index + 1}</td>
                        <td className="text-center text-white">{score}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot className='col-span-2'>
                <tr className='grid grid-cols-2'>
                    <th className="text-center text-white"></th>
                    <th className="text-center text-white">Score</th>
                </tr>
            </tfoot>
        </table>
    );
}
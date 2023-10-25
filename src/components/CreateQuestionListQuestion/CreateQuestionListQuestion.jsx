export default function CreateQuestionListQuestion({ question, index }) {

    return (
        <div className="col-span-12">
            <h2 className="truncate">{question.question}</h2>
        </div>
    );
}
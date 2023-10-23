import sendRequest from "./send-request";
const BASE_URL = "/api/quiz";

export async function createQuiz(quizData) {
    return sendRequest(BASE_URL, 'POST', quizData);
}
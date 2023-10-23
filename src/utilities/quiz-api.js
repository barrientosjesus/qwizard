import sendRequest from "./send-request";
const BASE_URL = "/api/quizzes";

export async function createQuiz(quizData) {
    return sendRequest(`${BASE_URL}/create`, 'POST', quizData);
}
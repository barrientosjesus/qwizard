import sendRequest from "./send-request";
const BASE_URL = "/api/games";

export async function getAllGamesForUser() {
    return sendRequest(BASE_URL);
}

export async function getAllGamesForQuiz(quizID) {
    return sendRequest(`${BASE_URL}/quiz/${quizID}`)
}
// Axios to consume for the API
import axios from "axios";

// Create the api url
const API = axios.create({ baseURL: "http://localhost:5000" }); // local

// Request to add new answer in the question
export const addAnswer = (answerData) => 
    API.post("/answerRoute/", answerData);

//Request to update the answer info
export const updateAnswer = (updateAnswersData) =>
    API.patch("/answerRoute/", updateAnswersData);

//Request to change the visibility of the answer
export const deleteAnswer = (idDelete) => 
    API.put("/answerRoute/", idDelete);

//Request to update the answer like
export const updateLikeAnswer = (updateLikeAnswerData) =>
API.put("/answerRoute/updateNumberLike", updateLikeAnswerData);

//Request to update the answer like
export const updateReportAnswer = (updateReportAnswerData) =>
API.put("/answerRoute/updateReport", updateReportAnswerData);

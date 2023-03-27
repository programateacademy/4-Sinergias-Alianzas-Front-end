import { createSlice } from "@reduxjs/toolkit";
import { addAnswer, deleteAnswer, updateAnswer, updateLikeAnswer, updateReportAnswer } from "../thunks/answerThunk";
import { getQuestions,
         getQuestionReport, 
         addQuestion, 
         updateQuestion,  
         deleteQuestion, 
         updateLikeQuestion, 
         updateReportQuestion } from "../thunks/foroThunks"

const foroSlice = createSlice({
    name: "foro",
    initialState: {
      foro: [],
      foroReport: [],
      error: "",
      loading: false,
    },
    extraReducers: {
        [getQuestions.fulfilled]: (state, action) => {
            state.loading = false;
            state.foro = action.payload;
        },
        [getQuestionReport.fulfilled]: (state, action) => {
            state.loading = false;
            state.foroReport = action.payload;
        },
        [addQuestion.pending]: (state, action) => {
            state.loading = true;
        },
        [addQuestion.fulfilled]: (state, action) => {
            state.loading = false;
            state.foro = [action.payload];
        },
        [updateQuestion.pending]: (state, action) => {
            state.loading = true;
        },
        [updateQuestion.fulfilled]: (state, action) => {
            state.loading = false;
            state.foro = [action.payload];
        },
        [deleteQuestion.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteQuestion.fulfilled]: (state, action) => {
            state.loading = false;
            state.foro = [action.payload];
        },
        [updateLikeQuestion.pending]: (state, action) => {
            state.loading = true;
        },
        [updateLikeQuestion.fulfilled]: (state, action) => {
            state.loading = false;
            state.foro = [action.payload];
        },
        [updateReportQuestion.pending]: (state, action) => {
            state.loading = true;
        },
        [updateReportQuestion.fulfilled]: (state, action) => {
            state.loading = false;
            state.foro = [action.payload];
        },
        [addAnswer.pending]: (state, action) => {
            state.loading = true;
        },
        [addAnswer.fulfilled]: (state, action) => {
            state.loading = false;
            state.foro = [action.payload];
        },
        [updateAnswer.pending]: (state, action) => {
            state.loading = true;
        },
        [updateAnswer.fulfilled]: (state, action) => {
            state.loading = false;
            state.foro = [action.payload];
        },
        [deleteAnswer.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteAnswer.fulfilled]: (state, action) => {
            state.loading = false;
            state.foro = [action.payload];
        },
        [updateLikeAnswer.pending]: (state, action) => {
            state.loading = true;
        },
        [updateLikeAnswer.fulfilled]: (state, action) => {
            state.loading = false;
            state.foro = [action.payload];
        },
        [updateReportAnswer.pending]: (state, action) => {
            state.loading = true;
        },
        [updateReportAnswer.fulfilled]: (state, action) => {
            state.loading = false;
            state.foro = [action.payload];
        },
    }
});


export default foroSlice.reducer;
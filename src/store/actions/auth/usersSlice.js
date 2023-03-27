import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../api";

//components list
export const getUsers = createAsyncThunk(
    "api/users/usersList",
    async (_, { rejectWithValue }) => {
      try {
        
        const response = await api.getUsers();
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  
  const usersSlice = createSlice({
    name: "usuario",
    initialState: {
      usuario: {},
      usuarios: [],      
      error: "",
      loading: false,
    },
    [getUsers.pending]: (state, action) => {
        state.loading = true;
      },
      [getUsers.fulfilled]: (state, action) => {
        state.loading = false;
        state.usuarios = action.payload;
      },
      [getUsers.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }
  })
  
  export default usersSlice.reducer;
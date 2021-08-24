import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const allUsers = createAsyncThunk(
  "allUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/users");

      return data.users;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  users: [],
  error: null,
  loading: false,
};

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [allUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [allUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [allUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearError } = allUsersSlice.actions;
export default allUsersSlice.reducer;

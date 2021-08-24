import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserDetails = createAsyncThunk(
  "userDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/users/${id}`);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  user: {},
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    userReset: (state) => {
      state.user = {};
    },
  },
  extraReducers: {
    [getUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getUserDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearError, userReset } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;

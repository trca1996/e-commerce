import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async ({ id, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/reviews?id=${id}&productId=${productId}`
      );

      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
const initialState = {
  loading: false,
  error: null,
  isDeleted: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    },
    deleteReviewReset: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: {
    [deleteReview.pending]: (state) => {
      state.loading = true;
    },
    [deleteReview.fulfilled]: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    [deleteReview.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearReviewError, deleteReviewReset } = reviewSlice.actions;
export default reviewSlice.reducer;

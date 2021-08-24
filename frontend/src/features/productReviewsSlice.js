import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductReviews = createAsyncThunk(
  "getProductReviews",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
      return data.reviews;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const productReviewsSlice = createSlice({
  name: "productReviews",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [getProductReviews.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductReviews.fulfilled]: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    [getProductReviews.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearError } = productReviewsSlice.actions;
export default productReviewsSlice.reducer;

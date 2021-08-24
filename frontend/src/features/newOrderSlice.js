import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "newOrder/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/v1/order/new", order, config);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  order: {},
  loading: false,
  error: null,
};

const newOrderSlice = createSlice({
  name: "newOrder",
  initialState,
  reducers: {
    clearError: (state) => (state.error = null),
  },
  extraReducers: {
    [createOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    [createOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearError } = newOrderSlice.actions;
export default newOrderSlice.reducer;

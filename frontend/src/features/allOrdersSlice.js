import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const allOrders = createAsyncThunk(
  "allOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/orders");

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  loading: false,
  orders: [],
  totalAmount: 0,
  error: null,
};

const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState,
  reducers: {
    clearOrdersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [allOrders.pending]: (state, action) => {
      state.loading = true;
    },
    [allOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.totalAmount = action.payload.totalAmount;
    },
    [allOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearOrdersError } = allOrdersSlice.actions;
export default allOrdersSlice.reducer;

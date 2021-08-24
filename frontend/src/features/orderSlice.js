import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, orderData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/v1/admin/order/${id}`,
        orderData,
        config
      );

      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  loading: false,
  isUpdated: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrderReset: (state) => {
      state.isUpdated = false;
    },
    deleteOrderReset: (state) => {
      state.isDeleted = false;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [updateOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [updateOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    [updateOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    [deleteOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { updateOrderReset, clearOrderError, deleteOrderReset } =
  orderSlice.actions;
export default orderSlice.reducer;

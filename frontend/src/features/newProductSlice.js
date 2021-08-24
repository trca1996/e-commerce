import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const newProduct = createAsyncThunk(
  "newProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/admin/product/new",
        productData,
        config
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  product: {},
  success: false,
  loading: false,
  error: null,
};

const newProductSlice = createSlice({
  name: "newProduct",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    newProductReset: (state) => {
      state.success = false;
    },
  },
  extraReducers: {
    [newProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [newProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.product = action.payload.product;
    },
    [newProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearError, newProductReset } = newProductSlice.actions;
export default newProductSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        productData,
        config
      );

      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  isDeleted: false,
  isUpdated: false,
  error: null,
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    deleteProductReset: (state) => {
      state.isDeleted = false;
    },
    updateProductReset: (state) => {
      state.isUpdated = false;
    },
  },
  extraReducers: {
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateProduct.pending]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearProductError, deleteProductReset, updateProductReset } =
  productSlice.actions;
export default productSlice.reducer;

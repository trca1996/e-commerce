import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (
    { keyword = "", currentPage = 1, price, category, rating = 0 },
    { rejectWithValue }
  ) => {
    try {
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
      }

      const { data } = await axios.get(link);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getAdminProducts = createAsyncThunk(
  "products/getAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/products");

      return data.products;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  loading: false,
  products: [],
  productsCount: 0,
  error: null,
  resPerPage: 0,
  filteredProductsCount: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: {
    [getAllProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resPerPage = action.payload.resPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    [getAllProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getAdminProducts.pending]: (state, action) => {
      state.loading = true;
      state.products = [];
    },
    [getAdminProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [getAdminProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;

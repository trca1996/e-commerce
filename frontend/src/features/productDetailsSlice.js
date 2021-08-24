import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProductDetails = createAsyncThunk(
  'products/getProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`)
      return data
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  },
)

const initialState = {
  product: {},
  loading: false,
  error: null,
}

const productSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.error = null
    },
  },
  extraReducers: {
    [getProductDetails.pending]: (state, action) => {
      state.loading = true
    },
    [getProductDetails.fulfilled]: (state, action) => {
      state.loading = false
      state.product = action.payload.product
    },
    [getProductDetails.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { clearError } = productSlice.actions
export default productSlice.reducer

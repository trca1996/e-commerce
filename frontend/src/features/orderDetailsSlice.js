import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getOrderDetails = createAsyncThunk(
  'getOrderDetails',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/order/${id}`)

      return data.order
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  },
)

const initialState = {
  order: {},
  loading: false,
  error: null,
}

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.error = null
    },
  },
  extraReducers: {
    [getOrderDetails.pending]: (state, action) => {
      state.loading = true
    },
    [getOrderDetails.fulfilled]: (state, action) => {
      state.loading = false
      state.order = action.payload
    },
    [getOrderDetails.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { clearError } = orderDetailsSlice.actions
export default orderDetailsSlice.reducer

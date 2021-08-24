import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const myOrders = createAsyncThunk(
  'myOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/v1/orders/me')

      return data.orders
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  },
)

const initialState = {
  orders: [],
  loading: false,
  error: null,
}

const myOrdersSlice = createSlice({
  name: 'myOrders',
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.error = null
    },
  },
  extraReducers: {
    [myOrders.pending]: (state, action) => {
      state.loading = true
    },
    [myOrders.fulfilled]: (state, action) => {
      state.loading = false
      state.orders = action.payload
    },
    [myOrders.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { clearError } = myOrdersSlice.actions
export default myOrdersSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const newReview = createAsyncThunk(
  'newReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.put('/api/v1/review', reviewData, config)

      return data.success
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  },
)

const initialState = {
  loading: false,
  success: false,
  error: null,
}

const newReviewSlice = createSlice({
  name: 'newReview',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    newReviewReset: (state) => {
      state.success = false
    },
  },
  extraReducers: {
    [newReview.pending]: (state) => {
      state.loading = true
    },
    [newReview.fulfilled]: (state, action) => {
      state.loading = false
      state.success = action.payload
    },
    [newReview.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { clearError, newReviewReset } = newReviewSlice.actions
export default newReviewSlice.reducer

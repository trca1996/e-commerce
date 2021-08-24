import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/v1/password/forgot',
        email,
        config,
      )

      return data.message
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  },
)

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async ({ token, passwords }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        passwords,
        config,
      )

      return data.success
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  },
)

const initialState = {
  message: null,
  loading: false,
  error: null,
  success: undefined,
}

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.error = null
    },
    clearMessage: (state, action) => {
      state.message = null
    },
  },
  extraReducers: {
    [forgotPassword.pending]: (state, action) => {
      state.error = null
      state.loading = true
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.message = action.payload
      state.loading = false
    },
    [forgotPassword.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    [resetPassword.pending]: (state, action) => {
      state.error = null
      state.loading = true
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.success = action.payload
      state.loading = false
    },
    [resetPassword.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { clearError, clearMessage } = forgotPasswordSlice.actions
export default forgotPasswordSlice.reducer

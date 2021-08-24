import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
        config
      );

      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/v1/register", userData, config);

      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/me");

      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get("/api/v1/logout");
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
////////////////////////////////////////////////////////////////////////////

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    [loadUser.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [loadUser.rejected]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    [logout.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { clearError, updateProfileReset, updatePasswordReset } =
  userSlice.actions;
export default userSlice.reducer;

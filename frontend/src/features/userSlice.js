import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put("/api/v1/me/update", userData, config);
      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (passwords, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        "/api/v1/password/update",
        passwords,
        config
      );

      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateProfile",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/users/${id}`,
        userData,
        config
      );
      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/updateProfile",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/users/${id}`);
      return data.success;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserReset: (state) => {
      state.isUpdated = false;
    },
    deleteUserReset: (state) => {
      state.isDeleted = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    [updateProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    [updateProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updatePassword.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    [updatePassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteUser.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { updateUserReset, deleteUserReset, clearError } =
  userSlice.actions;
export default userSlice.reducer;

import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import customerServices from "./customerService";

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
  blocked: false,
  active: false,
};

export const getAllUsers = createAsyncThunk(
  "customers/get-customers",
  async (thunkAPI) => {
    try {
      return await customerServices.getAllUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const blockUser = createAsyncThunk(
  "customers/block-customers",
  async (data, thunkAPI) => {
    try {
      return await customerServices.blockUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const activeUser = createAsyncThunk(
  "customers/active-customers",
  async (data, thunkAPI) => {
    try {
      return await customerServices.activeUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const customerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetBlockedUser: (state) => {
      state.blocked = false;
    },
    resetActiveUser: (state) => {
      state.active = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.customers = null;
        state.msg = action.payload;
      })
      .addCase(blockUser.pending, (state) => {
        state.isLoading = true;
        state.blocked = false;
        state.isError = false;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blocked = true;
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.blocked = false;
      })
      .addCase(activeUser.pending, (state) => {
        state.isLoading = true;
        state.active = false;
        state.isError = false;
      })
      .addCase(activeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.active = true;
      })
      .addCase(activeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.active = false;
      });
  },
});

export default customerSlice.reducer;
export const {resetActiveUser, resetBlockedUser} = customerSlice.actions;

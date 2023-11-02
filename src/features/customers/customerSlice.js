import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import customerServices from "./customerService";

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
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

export const customerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
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
      });
  },
});

export default customerSlice.reducer;

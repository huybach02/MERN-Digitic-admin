import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authServices from "./authService";

const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: null,
  orderInfo: {},
  updated: false,
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (data, thunkAPI) => {
    try {
      return await authServices.login(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "auth/get-orders",
  async (thunkAPI) => {
    try {
      return await authServices.getAllOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "auth/get-order-by-id",
  async (data, thunkAPI) => {
    try {
      return await authServices.getOrderById(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "auth/update-order-status",
  async (data, thunkAPI) => {
    try {
      return await authServices.updateOrderStatus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.msg = null;
      localStorage.removeItem("user");
    },
    resetOrderInfo: (state) => {
      state.orderInfo = {};
    },
    resetUpdatedOrderStatus: (state) => {
      state.updated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        state.msg = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.error && true;
        state.user = null;
        state.msg = null;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        console.log("action: ", action);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload?.data;
        state.msg = null;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.error && true;
        state.orders = null;
        state.msg = null;
      })
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
        state.orderInfo = {};
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderInfo = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.orderInfo = null;
        state.msg = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.updated = false;
        state.isError = false;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updated = true;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.updated = false;
      });
  },
});

export default authSlice.reducer;
export const {logout, resetUpdatedOrderStatus} = authSlice.actions;

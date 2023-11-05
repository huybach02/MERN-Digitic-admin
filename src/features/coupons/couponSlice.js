import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import couponService from "./couponService";

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
  created: false,
};

export const getAllCoupons = createAsyncThunk(
  "coupon/get-coupons",
  async (thunkAPI) => {
    try {
      return await couponService.getAllCoupons();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupon/create-coupon",
  async (data, thunkAPI) => {
    try {
      return await couponService.createCoupon(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    resetCreatedCoupon: (state) => {
      state.created = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.coupons = null;
        state.msg = action.payload;
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
        state.created = false;
        state.isError = false;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.created = true;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.created = false;
      });
  },
});

export default couponSlice.reducer;
export const {resetCreatedCoupon} = couponSlice.actions;

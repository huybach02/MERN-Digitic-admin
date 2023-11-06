import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import couponService from "./couponService";

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
  created: false,
  updated: false,
  deleted: false,
  couponInfo: {},
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

export const getOneCoupon = createAsyncThunk(
  "coupon/get-one-coupon",
  async (data, thunkAPI) => {
    try {
      return await couponService.getOneCoupon(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "coupon/update-coupon",
  async (data, thunkAPI) => {
    try {
      return await couponService.updateCoupon(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupon/delete-coupon",
  async (data, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(data);
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
    resetUpdatedCoupon: (state) => {
      state.updated = false;
    },
    resetDeletedCoupon: (state) => {
      state.deleted = false;
    },
    resetCouponInfo: (state) => {
      state.couponInfo = {};
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
      })
      .addCase(getOneCoupon.pending, (state) => {
        state.isLoading = true;
        state.couponInfo = {};
      })
      .addCase(getOneCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.couponInfo = action.payload;
      })
      .addCase(getOneCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.couponInfo = null;
        state.msg = action.payload;
      })
      .addCase(updateCoupon.pending, (state) => {
        state.isLoading = true;
        state.updated = false;
        state.isError = false;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updated = true;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.updated = false;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
        state.deleted = false;
        state.isError = false;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleted = true;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.deleted = false;
      });
  },
});

export default couponSlice.reducer;
export const {
  resetCreatedCoupon,
  resetCouponInfo,
  resetDeletedCoupon,
  resetUpdatedCoupon,
} = couponSlice.actions;

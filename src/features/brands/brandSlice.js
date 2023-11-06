import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import brandService from "./brandService";

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
  created: false,
  updated: false,
  deleted: false,
  brandInfo: {},
};

export const getAllBrands = createAsyncThunk(
  "brand/get-brands",
  async (thunkAPI) => {
    try {
      return await brandService.getAllBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBrand = createAsyncThunk(
  "brand/create-brand",
  async (data, thunkAPI) => {
    try {
      return await brandService.createBrand(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneBrand = createAsyncThunk(
  "brand/get-one-brand",
  async (data, thunkAPI) => {
    try {
      return await brandService.getOneBrand(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brand/update-brand",
  async (data, thunkAPI) => {
    try {
      return await brandService.updateBrand(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/delete-brand",
  async (data, thunkAPI) => {
    try {
      return await brandService.deleteBrand(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    resetCreatedBrand: (state) => {
      state.created = false;
    },
    resetUpdatedBrand: (state) => {
      state.updated = false;
    },
    resetDeletedBrand: (state) => {
      state.deleted = false;
    },
    resetBrandInfo: (state) => {
      state.brandInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.brands = null;
        state.msg = action.payload;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
        state.created = false;
        state.isError = false;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.created = true;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.created = false;
      })
      .addCase(getOneBrand.pending, (state) => {
        state.isLoading = true;
        state.brandInfo = {};
      })
      .addCase(getOneBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brandInfo = action.payload;
      })
      .addCase(getOneBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.brandInfo = null;
        state.msg = action.payload;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
        state.updated = false;
        state.isError = false;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updated = true;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.updated = false;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
        state.deleted = false;
        state.isError = false;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleted = true;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.deleted = false;
      });
  },
});

export default brandSlice.reducer;
export const {
  resetCreatedBrand,
  resetUpdatedBrand,
  resetBrandInfo,
  resetDeletedBrand,
} = brandSlice.actions;

import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import productCategoryService from "./productCategoryService";

const initialState = {
  productCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
  created: false,
};

export const getAllProductCategories = createAsyncThunk(
  "category/get-product-categories",
  async (thunkAPI) => {
    try {
      return await productCategoryService.getAllProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/create-category",
  async (data, thunkAPI) => {
    try {
      return await productCategoryService.createProductCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState,
  reducers: {
    resetCreatedCategory: (state) => {
      state.created = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCategories = action.payload;
      })
      .addCase(getAllProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.productCategories = null;
        state.msg = action.payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.created = false;
        state.isError = false;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.created = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.created = false;
      });
  },
});

export default productCategoriesSlice.reducer;
export const {resetCreatedCategory} = productCategoriesSlice.actions;

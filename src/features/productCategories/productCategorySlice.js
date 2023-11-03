import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import productCategoryService from "./productCategoryService";

const initialState = {
  productCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
};

export const getAllProductCategories = createAsyncThunk(
  "product/get-product-categories",
  async (thunkAPI) => {
    try {
      return await productCategoryService.getAllProductCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState,
  reducers: {},
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
      });
  },
});

export default productCategoriesSlice.reducer;

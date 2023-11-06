import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import productCategoryService from "./productCategoryService";

const initialState = {
  productCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
  created: false,
  updated: false,
  deleted: false,
  categoryInfo: {},
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

export const getOneCategory = createAsyncThunk(
  "category/get-one-category",
  async (data, thunkAPI) => {
    try {
      return await productCategoryService.getOneProductCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update-category",
  async (data, thunkAPI) => {
    try {
      return await productCategoryService.updateProductCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete-category",
  async (data, thunkAPI) => {
    try {
      return await productCategoryService.deleteProductCategory(data);
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
    resetUpdatedCategory: (state) => {
      state.updated = false;
    },
    resetDeletedCategory: (state) => {
      state.deleted = false;
    },
    resetCategoryInfo: (state) => {
      state.categoryInfo = {};
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
      })
      .addCase(getOneCategory.pending, (state) => {
        state.isLoading = true;
        state.categoryInfo = {};
      })
      .addCase(getOneCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryInfo = action.payload;
      })
      .addCase(getOneCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.categoryInfo = null;
        state.msg = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.updated = false;
        state.isError = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updated = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.updated = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.deleted = false;
        state.isError = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleted = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.deleted = false;
      });
  },
});

export default productCategoriesSlice.reducer;
export const {
  resetCreatedCategory,
  resetCategoryInfo,
  resetDeletedCategory,
  resetUpdatedCategory,
} = productCategoriesSlice.actions;

import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import blogCategoryService from "./blogCategoryService";

const initialState = {
  blogCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
  created: false,
  updated: false,
  deleted: false,
  blogCategoryInfo: {},
};

export const getAllBlogCategories = createAsyncThunk(
  "blog/get-categories",
  async (thunkAPI) => {
    try {
      return await blogCategoryService.getAllBlogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlogCategory = createAsyncThunk(
  "blog/create-blog-category",
  async (data, thunkAPI) => {
    try {
      return await blogCategoryService.createBlogCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneBlogCategory = createAsyncThunk(
  "blog/get-one-blog-category",
  async (data, thunkAPI) => {
    try {
      return await blogCategoryService.getOneBlogCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBlogCategory = createAsyncThunk(
  "blog/update-blog-category",
  async (data, thunkAPI) => {
    try {
      return await blogCategoryService.updateBlogCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlogCategory = createAsyncThunk(
  "blog/delete-blog-category",
  async (data, thunkAPI) => {
    try {
      return await blogCategoryService.deleteBlogCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const blogCategorySlice = createSlice({
  name: "blogCategories",
  initialState,
  reducers: {
    resetCreatedBlogCategory: (state) => {
      state.created = false;
    },
    resetUpdatedBlogCategory: (state) => {
      state.updated = false;
    },
    resetDeletedBlogCategory: (state) => {
      state.deleted = false;
    },
    resetBlogCategoryInfo: (state) => {
      state.blogCategoryInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategories = action.payload;
      })
      .addCase(getAllBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogCategories = null;
        state.msg = action.payload;
      })
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
        state.created = false;
        state.isError = false;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.created = true;
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.created = false;
      })
      .addCase(getOneBlogCategory.pending, (state) => {
        state.isLoading = true;
        state.blogCategoryInfo = {};
      })
      .addCase(getOneBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategoryInfo = action.payload;
      })
      .addCase(getOneBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogCategoryInfo = null;
        state.msg = action.payload;
      })
      .addCase(updateBlogCategory.pending, (state) => {
        state.isLoading = true;
        state.updated = false;
        state.isError = false;
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updated = true;
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.updated = false;
      })
      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true;
        state.deleted = false;
        state.isError = false;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleted = true;
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.deleted = false;
      });
  },
});

export default blogCategorySlice.reducer;
export const {
  resetCreatedBlogCategory,
  resetBlogCategoryInfo,
  resetDeletedBlogCategory,
  resetUpdatedBlogCategory,
} = blogCategorySlice.actions;

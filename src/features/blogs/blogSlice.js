import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import blogService from "./blogService";

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
  created: false,
  updated: false,
  deleted: false,
  blogInfo: {},
};

export const getAllBlogs = createAsyncThunk(
  "blog/get-blogs",
  async (thunkAPI) => {
    try {
      return await blogService.getAllBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blog/create-blog",
  async (data, thunkAPI) => {
    try {
      return await blogService.createBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneBlog = createAsyncThunk(
  "blog/get-one-blog",
  async (data, thunkAPI) => {
    try {
      return await blogService.getOneBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/update-blog",
  async (data, thunkAPI) => {
    try {
      return await blogService.updateBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/delete-blog",
  async (data, thunkAPI) => {
    try {
      return await blogService.deleteBlog(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    resetCreatedBlog: (state) => {
      state.created = false;
      state.isError = false;
    },
    resetUpdatedBlog: (state) => {
      state.updated = false;
    },
    resetDeletedBlog: (state) => {
      state.deleted = false;
    },
    resetBlogInfo: (state) => {
      state.blogInfo = {};
    },
    deleteImageFromBlogInfo: (state, action) => {
      state?.blogInfo?.images?.splice(
        state.blogInfo.images.findIndex(
          (el) => el.public_id === action.payload
        ),
        1
      );
      // action.payload &&
      //   state.blogInfo.images.map((item) => item.public_id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogs = null;
        state.msg = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
        state.created = false;
        state.isError = false;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.created = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.created = false;
      })
      .addCase(getOneBlog.pending, (state) => {
        state.isLoading = true;
        state.blogInfo = {};
      })
      .addCase(getOneBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogInfo = action.payload;
      })
      .addCase(getOneBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.blogInfo = null;
        state.msg = action.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
        state.updated = false;
        state.isError = false;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updated = true;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.updated = false;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
        state.deleted = false;
        state.isError = false;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleted = true;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.deleted = false;
      });
  },
});

export default blogSlice.reducer;
export const {
  resetCreatedBlog,
  resetBlogInfo,
  resetDeletedBlog,
  resetUpdatedBlog,
  deleteImageFromBlogInfo,
} = blogSlice.actions;

import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import colorService from "./colorService";

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
  created: false,
  updated: false,
  deleted: false,
  colorInfo: {},
};

export const getAllColors = createAsyncThunk(
  "color/get-colors",
  async (thunkAPI) => {
    try {
      return await colorService.getAllColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createColor = createAsyncThunk(
  "color/create-color",
  async (data, thunkAPI) => {
    try {
      return await colorService.createColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneColor = createAsyncThunk(
  "color/get-one-color",
  async (data, thunkAPI) => {
    try {
      return await colorService.getOneColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateColor = createAsyncThunk(
  "color/update-color",
  async (data, thunkAPI) => {
    try {
      return await colorService.updateColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "color/delete-color",
  async (data, thunkAPI) => {
    try {
      return await colorService.deleteColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    resetCreatedColor: (state) => {
      state.created = false;
    },
    resetUpdatedColor: (state) => {
      state.updated = false;
    },
    resetDeletedColor: (state) => {
      state.deleted = false;
    },
    resetColorInfo: (state) => {
      state.colorInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getAllColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = null;
        state.msg = action.payload;
      })
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
        state.created = false;
        state.isError = false;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.created = true;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.created = false;
      })
      .addCase(getOneColor.pending, (state) => {
        state.isLoading = true;
        state.colorInfo = {};
      })
      .addCase(getOneColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colorInfo = action.payload;
      })
      .addCase(getOneColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colorInfo = null;
        state.msg = action.payload;
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
        state.updated = false;
        state.isError = false;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updated = true;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.updated = false;
      })
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
        state.deleted = false;
        state.isError = false;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleted = true;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.deleted = false;
      });
  },
});

export default colorSlice.reducer;
export const {
  resetCreatedColor,
  resetColorInfo,
  resetDeletedColor,
  resetUpdatedColor,
} = colorSlice.actions;

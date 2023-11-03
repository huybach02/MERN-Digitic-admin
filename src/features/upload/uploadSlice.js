import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import uploadService from "./uploadService";

const initialState = {
  images: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
};

export const uploadImage = createAsyncThunk(
  "upload/upload-image",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImage(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "delete/delete-image",
  async (data, thunkAPI) => {
    try {
      return await uploadService.deleteImage(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.images = null;
        state.msg = action.payload;
      })
      .addCase(deleteImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        console.log("action: ", action);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        let newImages = state?.images?.data?.filter(
          (item) => item.public_id !== action.meta.arg
        );
        state.images.data = [...newImages];
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.msg = action.payload;
      });
  },
});

export default uploadSlice.reducer;

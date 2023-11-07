import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
  updated: false,
};

export const getAllEnquiries = createAsyncThunk(
  "enquiry/get-enquiries",
  async (thunkAPI) => {
    try {
      return await enquiryService.getAllEnquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateEnquiry = createAsyncThunk(
  "enquiry/update-enquiry",
  async (data, thunkAPI) => {
    try {
      return await enquiryService.updateEnquiry(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {
    resetUpdatedEnquiry: (state) => {
      state.updated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getAllEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.enquiries = null;
        state.msg = action.payload;
      })
      .addCase(updateEnquiry.pending, (state) => {
        state.isLoading = true;
        state.updated = false;
        state.isError = false;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updated = true;
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error && true;
        state.isSuccess = false;
        state.msg = null;
        state.updated = false;
      });
  },
});

export default enquirySlice.reducer;
export const {resetUpdatedEnquiry} = enquirySlice.actions;

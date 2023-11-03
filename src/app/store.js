import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customersReducer from "../features/customers/customerSlice";
import productReducer from "../features/products/productSlice";
import brandReducer from "../features/brands/brandSlice";
import productCategoriesReducer from "../features/productCategories/productCategorySlice";
import colorsReducer from "../features/colors/colorSlice";
import blogCategoriesReducer from "../features/blogCategories/blogCategorySlice";
import blogsReducer from "../features/blogs/blogSlice";
import enquiriesReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
    products: productReducer,
    brands: brandReducer,
    productCategories: productCategoriesReducer,
    colors: colorsReducer,
    blogCategories: blogCategoriesReducer,
    blogs: blogsReducer,
    enquiries: enquiriesReducer,
    upload: uploadReducer,
  },
});

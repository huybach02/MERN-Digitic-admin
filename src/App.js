import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import BlogCategoryList from "./pages/BlogCategoryList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ColorList from "./pages/ColorList";
import CategoryList from "./pages/CategoryList";
import ProductList from "./pages/ProductList";
import BrandList from "./pages/BrandList";
import AddBlog from "./pages/AddBlog";
import AddBlogCategory from "./pages/AddBlogCategory";
import AddColor from "./pages/AddColor";
import AddCategory from "./pages/AddCategory";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CouponList from "./pages/CouponList";
import AddCoupon from "./pages/AddCoupon";
import ViewOrder from "./pages/ViewOrder";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="enquiries" element={<Enquiries />}></Route>
            <Route path="blog-list" element={<BlogList />}></Route>
            <Route
              path="blog-category-list"
              element={<BlogCategoryList />}
            ></Route>
            <Route path="orders" element={<Orders />}></Route>
            <Route path="order/:id" element={<ViewOrder />}></Route>
            <Route path="customers" element={<Customers />}></Route>
            <Route path="color-list" element={<ColorList />}></Route>
            <Route path="category-list" element={<CategoryList />}></Route>
            <Route path="product-list" element={<ProductList />}></Route>
            <Route path="brand-list" element={<BrandList />}></Route>
            <Route path="coupon-list" element={<CouponList />}></Route>
            <Route path="add-blog" element={<AddBlog />}></Route>
            <Route path="update-blog/:id" element={<AddBlog />}></Route>
            <Route
              path="add-blog-category"
              element={<AddBlogCategory />}
            ></Route>
            <Route
              path="update-blog-category/:id"
              element={<AddBlogCategory />}
            ></Route>
            <Route path="add-color" element={<AddColor />}></Route>
            <Route path="update-color/:id" element={<AddColor />}></Route>
            <Route path="add-category" element={<AddCategory />}></Route>
            <Route path="update-category/:id" element={<AddCategory />}></Route>
            <Route path="add-brand" element={<AddBrand />}></Route>
            <Route path="update-brand/:id" element={<AddBrand />}></Route>
            <Route path="add-product" element={<AddProduct />}></Route>
            <Route path="update-product/:id" element={<AddProduct />}></Route>
            <Route path="add-coupon" element={<AddCoupon />}></Route>
            <Route path="update-coupon/:id" element={<AddCoupon />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;

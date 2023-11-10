import React, {useEffect} from "react";
import CustomInput from "../components/CustomInput";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
  createBlogCategory,
  getOneBlogCategory,
  resetBlogCategoryInfo,
  resetCreatedBlogCategory,
  resetUpdatedBlogCategory,
  updateBlogCategory,
} from "../features/blogCategories/blogCategorySlice";
import {useParams, useNavigate} from "react-router-dom";

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  const {created, isError, isLoading, blogCategoryInfo, updated} = useSelector(
    (state) => state.blogCategories
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCategoryInfo?.title || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("This field cannot be empty"),
    }),
    onSubmit: (values) => {
      if (param?.id) {
        dispatch(updateBlogCategory({id: param?.id, data: values}));
      } else {
        dispatch(createBlogCategory(values));
      }
    },
  });

  useEffect(() => {
    if (param?.id) {
      dispatch(getOneBlogCategory(param?.id));
    } else {
      dispatch(resetBlogCategoryInfo());
    }
  }, [param?.id]);

  useEffect(() => {
    if (created) {
      toast.success("Create blog category successfully!");
      formik.resetForm();
      dispatch(resetCreatedBlogCategory());
    }
    if (updated) {
      toast.success("Update blog category successfully!");
      formik.resetForm();
      dispatch(resetUpdatedBlogCategory());
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [created, isError, updated]);

  return (
    <div>
      <h3 className="mb-4 title">{param?.id ? "Edit" : "Add"} Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type={"text"}
            name={"blogCategory"}
            label={"Enter Blog Category"}
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur}
            error={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : null
            }
          />
          <button type="submit" className="w-100 btn btn-success my-3">
            {param?.id ? "Save" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;

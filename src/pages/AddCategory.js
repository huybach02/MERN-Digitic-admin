import React, {useEffect} from "react";
import CustomInput from "../components/CustomInput";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
  createCategory,
  resetCreatedCategory,
} from "../features/productCategories/productCategorySlice";

const AddBlogCategory = () => {
  const dispatch = useDispatch();

  const {created, isError, isLoading} = useSelector(
    (state) => state.productCategories
  );

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("This field cannot be empty"),
    }),
    onSubmit: (values) => {
      dispatch(createCategory(values));
    },
  });

  useEffect(() => {
    if (created) {
      toast.success("Create category successfully!");
      formik.resetForm();
      dispatch(resetCreatedCategory());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [created, isError]);

  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type={"text"}
            name={"brand"}
            label={"Enter Category"}
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
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;

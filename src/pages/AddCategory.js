import React, {useEffect} from "react";
import CustomInput from "../components/CustomInput";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
  createCategory,
  getOneCategory,
  resetCategoryInfo,
  resetCreatedCategory,
  resetUpdatedCategory,
  updateCategory,
} from "../features/productCategories/productCategorySlice";
import {useParams, useNavigate} from "react-router-dom";

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  const {created, isError, isLoading, categoryInfo, updated} = useSelector(
    (state) => state.productCategories
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryInfo?.title || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("This field cannot be empty"),
    }),
    onSubmit: (values) => {
      if (param?.id) {
        dispatch(updateCategory({id: param?.id, data: values}));
      } else {
        dispatch(createCategory(values));
      }
    },
  });

  useEffect(() => {
    if (param?.id) {
      dispatch(getOneCategory(param?.id));
    } else {
      dispatch(resetCategoryInfo());
    }
  }, [param?.id]);

  useEffect(() => {
    if (created) {
      toast.success("Create category successfully!");
      formik.resetForm();
      dispatch(resetCreatedCategory());
    }
    if (updated) {
      toast.success("Update category successfully!");
      formik.resetForm();
      dispatch(resetUpdatedCategory());
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [created, isError, updated]);

  return (
    <div>
      <h3 className="mb-4 title">{param?.id ? "Edit" : "Add"} Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type={"text"}
            name={"category"}
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
            {param?.id ? "Save" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;

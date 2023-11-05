import React, {useEffect} from "react";
import CustomInput from "../components/CustomInput";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {
  createBrand,
  getOneBrand,
  resetBrandInfo,
  resetCreatedBrand,
  resetUpdatedBrand,
  updateBrand,
} from "../features/brands/brandSlice";
import {toast} from "react-toastify";
import {useParams, useNavigate} from "react-router-dom";

const AddBrand = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  const {created, isError, isLoading, brandInfo, updated} = useSelector(
    (state) => state.brands
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandInfo?.title || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("This field cannot be empty"),
    }),
    onSubmit: (values) => {
      if (param?.id) {
        dispatch(updateBrand({id: param?.id, data: values}));
      } else {
        dispatch(createBrand(values));
      }
    },
  });

  useEffect(() => {
    if (param?.id) {
      dispatch(getOneBrand(param?.id));
    } else {
      dispatch(resetBrandInfo());
    }
  }, [param?.id]);

  useEffect(() => {
    if (created) {
      toast.success("Create brand successfully!");
      formik.resetForm();
      dispatch(resetCreatedBrand());
    }
    if (updated) {
      toast.success("Update brand successfully!");
      formik.resetForm();
      dispatch(resetUpdatedBrand());
      navigate("/admin/brand-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [created, isError, updated]);

  return (
    <div>
      <h3 className="mb-4 title">{param?.id ? "Edit" : "Add"} Brand</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type={"text"}
            name={"brand"}
            label={"Enter Brand"}
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

export default AddBrand;

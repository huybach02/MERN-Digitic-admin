import React, {useEffect} from "react";
import CustomInput from "../components/CustomInput";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {createBrand, resetCreatedBrand} from "../features/brands/brandSlice";
import {toast} from "react-toastify";

const AddBrand = () => {
  const dispatch = useDispatch();

  const {created, isError, isLoading} = useSelector((state) => state.brands);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("This field cannot be empty"),
    }),
    onSubmit: (values) => {
      dispatch(createBrand(values));
    },
  });

  useEffect(() => {
    if (created) {
      toast.success("Create brand successfully!");
      formik.resetForm();
      dispatch(resetCreatedBrand());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [created, isError]);

  return (
    <div>
      <h3 className="mb-4 title">Add Brand</h3>
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
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;

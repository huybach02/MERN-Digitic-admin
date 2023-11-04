import React, {useEffect} from "react";
import CustomInput from "../components/CustomInput";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {createColor, resetCreatedColor} from "../features/colors/colorSlice";

const AddColor = () => {
  const dispatch = useDispatch();

  const {created, isError, isLoading} = useSelector((state) => state.colors);

  const formik = useFormik({
    initialValues: {
      title: "",
      sku: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("This field cannot be empty"),
      sku: Yup.string().required("Please choose one color"),
    }),
    onSubmit: (values) => {
      dispatch(createColor(values));
    },
  });

  useEffect(() => {
    if (created) {
      toast.success("Create color successfully!");
      formik.resetForm();
      dispatch(resetCreatedColor());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [created, isError]);

  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type={"text"}
            name={"color"}
            label={"Enter Color Name"}
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur}
            error={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : null
            }
          />
          <CustomInput
            type={"color"}
            name={"sku"}
            label={"Enter Color"}
            value={formik.values.sku}
            onChange={formik.handleChange("sku")}
            onBlur={formik.handleBlur}
            error={
              formik.touched.sku && formik.errors.sku ? formik.errors.sku : null
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

export default AddColor;

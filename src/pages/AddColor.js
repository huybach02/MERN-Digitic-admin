import React, {useEffect} from "react";
import CustomInput from "../components/CustomInput";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
  createColor,
  getOneColor,
  resetColorInfo,
  resetCreatedColor,
  resetUpdatedColor,
  updateColor,
} from "../features/colors/colorSlice";
import {useParams, useNavigate} from "react-router-dom";

const AddColor = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  const {created, isError, isLoading, colorInfo, updated} = useSelector(
    (state) => state.colors
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorInfo?.title || "",
      sku: colorInfo?.sku || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("This field cannot be empty"),
      sku: Yup.string().required("Please choose one color"),
    }),
    onSubmit: (values) => {
      if (param?.id) {
        dispatch(updateColor({id: param?.id, data: values}));
      } else {
        dispatch(createColor(values));
      }
    },
  });

  useEffect(() => {
    if (param?.id) {
      dispatch(getOneColor(param?.id));
    } else {
      dispatch(resetColorInfo());
    }
  }, [param?.id]);

  useEffect(() => {
    if (created) {
      toast.success("Create color successfully!");
      formik.resetForm();
      dispatch(resetCreatedColor());
    }
    if (updated) {
      toast.success("Update color successfully!");
      formik.resetForm();
      dispatch(resetUpdatedColor());
      navigate("/admin/color-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [created, isError, updated]);

  return (
    <div>
      <h3 className="mb-4 title">{param?.id ? "Edit" : "Add"} Color</h3>
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
            {param?.id ? "Save" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;

import React, {useEffect} from "react";
import CustomInput from "../components/CustomInput";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {createBrand, resetCreatedBrand} from "../features/brands/brandSlice";
import {toast} from "react-toastify";
import {
  createCoupon,
  resetCreatedCoupon,
} from "../features/coupons/couponSlice";

const AddCoupon = () => {
  const dispatch = useDispatch();

  const {created, isError, isLoading} = useSelector((state) => state.coupons);

  const formik = useFormik({
    initialValues: {
      name: "",
      expire: "",
      discount: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("This field cannot be empty"),
      expire: Yup.date().required("This field cannot be empty"),
      discount: Yup.number()
        .required("This field cannot be empty")
        .min(0, "Number cannot be less than 0"),
    }),
    onSubmit: (values) => {
      formik.values.expire = new Date(values.expire).getTime();
      dispatch(createCoupon(values));
    },
  });

  useEffect(() => {
    if (created) {
      toast.success("Create brand successfully!");
      formik.resetForm();
      dispatch(resetCreatedCoupon());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [created, isError]);

  return (
    <div>
      <h3 className="mb-4 title">Add Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type={"text"}
            name={"name"}
            label={"Enter Coupon Name"}
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null
            }
          />
          <CustomInput
            type={"datetime-local"}
            name={"expire"}
            label={"Enter Expire Date"}
            value={formik.values.expire}
            onChange={formik.handleChange("expire")}
            onBlur={formik.handleBlur}
            error={
              formik.touched.expire && formik.errors.expire
                ? formik.errors.expire
                : null
            }
          />
          <CustomInput
            type={"number"}
            name={"discount"}
            label={"Enter % Discount"}
            value={formik.values.discount}
            onChange={formik.handleChange("discount")}
            onBlur={formik.handleBlur}
            error={
              formik.touched.discount && formik.errors.discount
                ? formik.errors.discount
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

export default AddCoupon;

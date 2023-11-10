import React, {useEffect} from "react";
import CustomInput from "../components/CustomInput";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {createBrand, resetCreatedBrand} from "../features/brands/brandSlice";
import {toast} from "react-toastify";
import {
  createCoupon,
  getOneCoupon,
  resetCouponInfo,
  resetCreatedCoupon,
  resetUpdatedCoupon,
  updateCoupon,
} from "../features/coupons/couponSlice";
import {useParams, useNavigate} from "react-router-dom";
import {changeDateFormat} from "../utils/const";

const AddCoupon = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  const {created, isError, isLoading, couponInfo, updated} = useSelector(
    (state) => state.coupons
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponInfo?.name || "",
      expire: changeDateFormat(couponInfo?.expire) || "",
      discount: couponInfo?.discount || 0,
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
      if (param?.id) {
        dispatch(updateCoupon({id: param?.id, data: values}));
      } else {
        dispatch(createCoupon(values));
      }
    },
  });

  useEffect(() => {
    if (param?.id) {
      dispatch(getOneCoupon(param?.id));
    } else {
      dispatch(resetCouponInfo());
    }
  }, [param?.id]);

  useEffect(() => {
    if (created) {
      toast.success("Create coupon successfully!");
      formik.resetForm();
      dispatch(resetCreatedCoupon());
    }
    if (updated) {
      toast.success("Update coupon successfully!");
      formik.resetForm();
      dispatch(resetUpdatedCoupon());
      navigate("/admin/coupon-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [created, isError, updated]);

  return (
    <div>
      <h3 className="mb-4 title">{param?.id ? "Edit" : "Add"} Coupon</h3>
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
            {param?.id ? "Save" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;

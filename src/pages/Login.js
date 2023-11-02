import React, {useEffect} from "react";
import CustomInput from "../components/CustomInput";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isLoading, isError, isSuccess, msg} = useSelector(
    (state) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("This field cannot be empty"),
      password: Yup.string().required("This field cannot be empty"),
    }),
    onSubmit: (values) => {
      dispatch(login({...values}));
    },
  });
  useEffect(() => {
    if (user.success) {
      navigate("/admin");
      toast.success(user.msg);
    } else {
      navigate("");
      toast.error("Email or password is incorrect!");
    }
  }, [user, isSuccess]);
  return (
    <div className="py-5" style={{background: "#ccc", minHeight: "100vh"}}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <br />
        <p className="text-center">Login to your account to continue.</p>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name={"email"}
            label="Email Address"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
          />

          <CustomInput
            type="password"
            name={"password"}
            label="Password"
            id="pass"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
            }
          />
          <div className="mb-3 text-end">
            <Link to="forgot-password" className="">
              Forgot Password?
            </Link>
          </div>
          <button
            className="btn btn-primary border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

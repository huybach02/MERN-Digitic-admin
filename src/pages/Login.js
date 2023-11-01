import React from "react";
import CustomInput from "../components/CustomInput";
import {Link} from "react-router-dom";

const Login = () => {
  return (
    <div className="py-5" style={{background: "#ccc", minHeight: "100vh"}}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <br />
        <p className="text-center">Login to your account to continue.</p>
        <form action="">
          <CustomInput type="text" label="Email Address" id="email" />
          <CustomInput type="password" label="Password" id="pass" />
          <div className="mb-3 text-end">
            <Link to="forgot-password" className="">
              Forgot Password?
            </Link>
          </div>
          <Link
            to="/admin"
            className="btn btn-primary border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            type="submit"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

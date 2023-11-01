import React from "react";
import CustomInput from "../components/CustomInput";
import {Link} from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="py-5" style={{background: "#ccc", minHeight: "100vh"}}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <br />
        <p className="text-center">
          Please Enter your register email to get reset password mail.
        </p>
        <form action="">
          <CustomInput type="text" label="Email Address" id="email" />
          <Link
            to="/admin"
            className="btn btn-primary border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            type="submit"
          >
            Submit
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

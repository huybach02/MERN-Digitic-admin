import React from "react";
import CustomInput from "../components/CustomInput";

const ResetPassword = () => {
  return (
    <div className="py-5" style={{background: "#ccc", minHeight: "100vh"}}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title"> Reset Password</h3>
        <br />
        <p className="text-center">Please Enter your new password.</p>
        <form action="">
          <CustomInput type="password" label="New Password" id="pass" />
          <CustomInput
            type="password"
            label="Confirm Password"
            id="confirmPassword"
          />

          <button
            className="btn btn-primary border-0 px-3 py-2 text-white fw-bold w-100"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

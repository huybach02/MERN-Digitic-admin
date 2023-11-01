import React from "react";
import CustomInput from "../components/CustomInput";

const AddBrand = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Brand</h3>
      <div>
        <form action="">
          <CustomInput type={"text"} label={"Enter Brand"} />
          <button type="submit" className="btn btn-success my-3">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;

import React from "react";
import CustomInput from "../components/CustomInput";

const AddColor = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="">
          <CustomInput type={"text"} label={"Enter Color Name"} />
          <CustomInput type={"color"} label={"Enter Color"} />
          <button type="submit" className="btn btn-success my-3">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;

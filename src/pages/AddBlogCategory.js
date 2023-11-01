import React from "react";
import CustomInput from "../components/CustomInput";

const AddBlogCategory = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div>
        <form action="">
          <CustomInput type={"text"} label={"Enter Blog Category"} />
          <button type="submit" className="btn btn-success my-3">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;

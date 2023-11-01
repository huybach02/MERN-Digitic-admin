import React, {useState} from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import {props, toolbar} from "../utils/const";
import {InboxOutlined} from "@ant-design/icons";
import {message, Upload} from "antd";
const {Dragger} = Upload;

const AddProduct = () => {
  const [desc, setDesc] = useState();
  const handleDesc = (e) => {
    setDesc(e);
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter Product Name" />
          <div className="mb-3">
            <ReactQuill
              theme="snow"
              modules={{toolbar}}
              value={desc}
              onChange={(evt) => {
                handleDesc(evt);
              }}
            />
          </div>
          <CustomInput type="number" label="Enter Product Price" />
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Select Brand</option>
          </select>
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Select Category</option>
          </select>
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Select Color</option>
          </select>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
          <button type="submit" className="btn btn-success my-3">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

import React, {useState} from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {InboxOutlined} from "@ant-design/icons";
import {Upload} from "antd";
import {props, toolbar} from "../utils/const";
const {Dragger} = Upload;

const AddBlog = () => {
  const [desc, setDesc] = useState("");

  return (
    <div>
      <h3 className="mb-4 title">Add New Blog</h3>
      <div>
        <form action="">
          <CustomInput type={"text"} label={"Enter Blog Title"} />
          <select name="" className="form-control py-3 mb-3" id="">
            <option value="">Select Category</option>
          </select>
          <div className="mt-3">
            <ReactQuill
              theme="snow"
              value={desc}
              modules={{toolbar}}
              onChange={setDesc}
            />
          </div>
          <div className="mt-4">
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
          </div>
          <button type="submit" className="btn btn-success my-5">
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;

import React, {useEffect, useState} from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import {toolbar} from "../utils/const";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import {useDispatch, useSelector} from "react-redux";
import {getAllBlogCategories} from "../features/blogCategories/blogCategorySlice";
import {deleteImage, uploadImage} from "../features/upload/uploadSlice";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import * as Yup from "yup";
import {createBlog, resetCreatedBlog} from "../features/blogs/blogSlice";

const AddBlog = () => {
  const dispatch = useDispatch();

  const [desc, setDesc] = useState("");
  const [imageList, setImageList] = useState([]);

  const {blogCategories} = useSelector((state) => state.blogCategories);
  const {images, isLoading: isLoadingImage} = useSelector(
    (state) => state.upload
  );
  const {created, isError, isLoading} = useSelector((state) => state.blogs);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("This field cannot be empty"),
      description: Yup.string().required("This field cannot be empty"),
      category: Yup.string().required("This field cannot be empty"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(createBlog(values));
    },
  });

  useEffect(() => {
    dispatch(getAllBlogCategories());
  }, []);

  useEffect(() => {
    setImageList(images?.data);
  }, [images?.data]);

  formik.values.images = imageList?.map((item) => ({
    public_id: item.public_id,
    url: item.url,
  }));

  useEffect(() => {
    if (created) {
      toast.success("Create product successfully!");
      formik.resetForm();
      setImageList([]);
      dispatch(resetCreatedBlog());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [created, isError]);

  return (
    <div>
      <h3 className="mb-4 title">Add New Blog</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type={"text"}
            name={"title"}
            label={"Enter Blog Title"}
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur}
            error={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : null
            }
          />
          <div className="form-floating mb-3">
            <select
              name="category"
              className="form-control form-select "
              id="floatingSelect"
              aria-label="Floating label select example"
              value={formik.values.category}
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur}
            >
              <option value="" disabled>
                Select category
              </option>
              {blogCategories?.map((item, index) => (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
            <label htmlFor="floatingSelect">Category</label>
            <p className="error">
              {formik.touched.category && formik.errors.category
                ? formik.errors.category
                : null}
            </p>
          </div>
          <div className="mt-3" onBlur={formik.handleBlur("description")}>
            <ReactQuill
              theme="snow"
              modules={{toolbar}}
              value={formik.values.description}
              onChange={formik.handleChange("description")}
            />
            <p className="error">
              {formik.touched.description && formik.errors.description
                ? formik.errors.description
                : null}
            </p>
          </div>
          <div className="bg-white border rounded-3 shadow-sm text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}
            >
              {({getRootProps, getInputProps}) => (
                <section className="w-100 p-5 pointer">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <h5>Upload images</h5>
                    <p>
                      Drag 'n' drop some files here, or click here to select
                      files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="mt-4">
            <h6 className="pb-2">Preview:</h6>
            <div className="d-flex ic flex-wrap gap-2">
              {imageList?.map((item, index) => (
                <div key={index} className="preview-images position-relative">
                  <img className="w-100 h-100" src={item?.url} alt="" />
                  <button
                    className="btn btn-close position-absolute"
                    onClick={() => dispatch(deleteImage(item?.public_id))}
                  ></button>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="w-100 btn btn-success my-5">
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;

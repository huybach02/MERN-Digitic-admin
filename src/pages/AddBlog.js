import React, {useEffect, useState} from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import {toolbar} from "../utils/const";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import {useDispatch, useSelector} from "react-redux";
import {
  getAllBlogCategories,
  resetBlogCategoryInfo,
} from "../features/blogCategories/blogCategorySlice";
import {
  deleteImage,
  resetDeletedImageId,
  resetImages,
  uploadImage,
} from "../features/upload/uploadSlice";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
  createBlog,
  getOneBlog,
  resetCreatedBlog,
  resetUpdatedBlog,
  updateBlog,
} from "../features/blogs/blogSlice";
import {useParams, useNavigate} from "react-router-dom";

const AddBlog = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  const [imageList, setImageList] = useState([]);
  console.log("imageList: ", imageList);

  const {blogCategories} = useSelector((state) => state.blogCategories);
  const {
    images,
    isLoading: isLoadingImage,
    deletedImageId,
  } = useSelector((state) => state.upload);
  console.log("deletedImageId: ", deletedImageId);
  const {created, isError, isLoading, blogInfo, updated} = useSelector(
    (state) => state.blogs
  );
  const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    if (blogInfo && param?.id) {
      formik.setValues({
        title: blogInfo?.title,
        description: blogInfo?.description,
        category: blogInfo?.category,
      });
    } else {
      setImageList([]);
    }
  }, [blogInfo, param?.id]);

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
      console.log("values: ", values);
      if (param?.id) {
        dispatch(updateBlog({id: param?.id, data: values}));
      } else {
        dispatch(createBlog(values));
      }
    },
  });

  useEffect(() => {
    if (param?.id) {
      dispatch(getOneBlog(param?.id));
    } else {
      dispatch(resetBlogCategoryInfo());
      setImageList([]);
    }
  }, [param?.id]);

  useEffect(() => {
    dispatch(getAllBlogCategories());
  }, []);

  useEffect(() => {
    setImageList(blogInfo?.images || images?.data);
  }, [images?.data, blogInfo?.images]);

  useEffect(() => {
    if (param?.id) {
      if (images?.data) {
        let img = imageList?.map((item) => ({
          public_id: item.public_id,
          url: item.url,
        }));
        img = [
          ...img,
          ...images?.data?.map((i) => ({
            public_id: i.public_id,
            url: i.url,
          })),
        ];
        formik.values.images = img;
        setImageList((prev) => [...prev, ...images?.data]);
      }
    } else {
      formik.values.images = images?.data?.map((item) => ({
        public_id: item.public_id,
        url: item.url,
      }));
    }
  }, [param?.id, images?.data]);

  useEffect(() => {
    if (deletedImageId) {
      const newImgList = imageList.filter(
        (item) => item.public_id !== deletedImageId
      );
      console.log("newImgList: ", newImgList);
      setImageList(newImgList);
      dispatch(resetDeletedImageId());
      formik.values.images = newImgList?.map((item) => ({
        public_id: item.public_id,
        url: item.url,
      }));
    }
  }, [deletedImageId]);

  formik.values.author = `${user?.data?.firstname} ${user?.data?.lastname}`;

  useEffect(() => {
    if (created) {
      toast.success("Create blog successfully!");
      formik.resetForm();
      setImageList([]);
      dispatch(resetCreatedBlog());
      dispatch(resetImages());
    }
    if (updated) {
      toast.success("Update blog successfully!");
      formik.resetForm();
      dispatch(resetUpdatedBlog());
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [created, isError, updated]);

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
              multiple={false}
              onDrop={(acceptedFiles) => dispatch(uploadImage(acceptedFiles))}
            >
              {({getRootProps, getInputProps}) => (
                <section className="w-100 p-5 pointer">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <h5>Upload thumb</h5>
                    <p>
                      Drag 'n' drop one file here, or click here to select file
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
                  <span
                    className="btn btn-close position-absolute"
                    onClick={() => dispatch(deleteImage(item?.public_id))}
                  ></span>
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

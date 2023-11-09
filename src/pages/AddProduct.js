import React, {useEffect, useState} from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import {toolbar} from "../utils/const";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getAllBrands} from "../features/brands/brandSlice";
import {getAllProductCategories} from "../features/productCategories/productCategorySlice";
import {getAllColors} from "../features/colors/colorSlice";
import {Select} from "antd";
import Dropzone from "react-dropzone";
import {
  deleteImage,
  resetImages,
  uploadImage,
} from "../features/upload/uploadSlice";
import {
  createProduct,
  resetCreatedProduct,
} from "../features/products/productSlice";
import {toast} from "react-toastify";
import Loading from "../components/Loading";

const tagList = [
  {
    label: "Feature",
    value: "feature",
  },
  {
    label: "Popular",
    value: "popular",
  },
  {
    label: "Special",
    value: "special",
  },
];

const AddProduct = () => {
  const dispatch = useDispatch();

  const [desc, setDesc] = useState();
  const [colorSelected, setColorSelected] = useState([]);
  const [tagSelected, setTagSelected] = useState([]);
  const [imageList, setImageList] = useState([]);

  const {brands} = useSelector((state) => state.brands);
  const {productCategories} = useSelector((state) => state.productCategories);
  const {colors} = useSelector((state) => state.colors);
  const {images, isLoading: isLoadingImage} = useSelector(
    (state) => state.upload
  );
  const {created, isError, isLoading} = useSelector((state) => state.products);

  const colorList = [];
  colors.forEach((item) => {
    colorList.push({
      label: item.title,
      value: item._id,
    });
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      quantity: 0,
      brand: "",
      category: "",
      color: [],
      tags: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("This field cannot be empty"),
      description: Yup.string().required("This field cannot be empty"),
      price: Yup.number()
        .required("This field cannot be empty")
        .min(0, "Number cannot be less than 0"),
      quantity: Yup.number()
        .required("This field cannot be empty")
        .min(0, "Number cannot be less than 0"),
      brand: Yup.string().required("This field cannot be empty"),
      category: Yup.string().required("This field cannot be empty"),
      color: Yup.array()
        .min(1, "Pick at least one color")
        .required("This field cannot be empty"),
      tags: Yup.array()
        .min(1, "Pick at least one tag")
        .required("This field cannot be empty"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(createProduct(values));
    },
  });

  const handleDesc = (e) => {
    setDesc(e);
  };

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllProductCategories());
    dispatch(getAllColors());
  }, []);

  useEffect(() => {
    formik.values.color = colorSelected;
    formik.values.tags = tagSelected;
  }, [colorSelected, tagSelected]);

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
      setColorSelected([]);
      setTagSelected([]);
      setImageList([]);
      dispatch(resetCreatedProduct());
      dispatch(resetImages());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [created, isError]);

  const handleColor = (item) => {
    setColorSelected(item);
  };
  const handleTag = (item) => {
    setTagSelected(item);
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name={"title"}
            label="Enter Product Name"
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur}
            error={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : null
            }
          />
          <div className="mb-3" onBlur={formik.handleBlur("description")}>
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
          <CustomInput
            type="number"
            name={"price"}
            label="Enter Product Price"
            value={formik.values.price}
            onChange={formik.handleChange("price")}
            onBlur={formik.handleBlur}
            error={
              formik.touched.price && formik.errors.price
                ? formik.errors.price
                : null
            }
          />
          <CustomInput
            type="number"
            name={"quantity"}
            label="Enter Quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange("quantity")}
            onBlur={formik.handleBlur}
            error={
              formik.touched.quantity && formik.errors.quantity
                ? formik.errors.quantity
                : null
            }
          />
          <div className="form-floating mb-3">
            <select
              name="brand"
              className="form-control form-select "
              id="floatingSelect"
              aria-label="Floating label select example"
              value={formik.values.brand}
              onChange={formik.handleChange("brand")}
              onBlur={formik.handleBlur}
            >
              <option value="" disabled>
                Select brand
              </option>
              {brands?.map((item, index) => (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
            <label htmlFor="floatingSelect">Brand</label>
            <p className="error">
              {formik.touched.brand && formik.errors.brand
                ? formik.errors.brand
                : null}
            </p>
          </div>
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
              {productCategories?.map((item, index) => (
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
          {/* <div className="form-floating mb-3">
            <select
              name="tags"
              className="form-control form-select "
              id="floatingSelect"
              aria-label="Floating label select example"
              value={formik.values.tags}
              onChange={formik.handleChange("tags")}
              onBlur={formik.handleBlur}
            >
              <option value="">Select tags</option>
              {productCategories?.map((item, index) => (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
            <label htmlFor="floatingSelect">Tags</label>
            <p className="error">
              {formik.touched.tags && formik.errors.tags
                ? formik.errors.tags
                : null}
            </p>
          </div> */}
          <div>
            <Select
              mode="multiple"
              allowClear
              style={{width: "100%"}}
              placeholder="Select Color"
              options={colorList}
              onChange={(i) => handleColor(i)}
              value={colorSelected}
            />
            <p className="error">
              {formik.touched.color && formik.errors.color
                ? formik.errors.color
                : null}
            </p>
          </div>
          <div>
            <Select
              mode="multiple"
              allowClear
              style={{width: "100%"}}
              placeholder="Select Tags"
              options={tagList}
              onChange={(i) => handleTag(i)}
              value={tagSelected}
            />
            <p className="error">
              {formik.touched.tags && formik.errors.tags
                ? formik.errors.tags
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
            {isLoadingImage && (
              <div className="text-center">
                <Loading size={"large"} />
              </div>
            )}
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
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

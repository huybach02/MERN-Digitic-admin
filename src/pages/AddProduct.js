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
import Multiselect from "react-widgets/Multiselect";
import Dropzone from "react-dropzone";
import {deleteImage, uploadImage} from "../features/upload/uploadSlice";
import {createProduct} from "../features/products/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();

  const [desc, setDesc] = useState();
  const [colorSelected, setColorSelected] = useState([]);
  const [imageList, setImageList] = useState([]);
  console.log("imageList: ", imageList);

  const {brands} = useSelector((state) => state.brands);
  const {productCategories} = useSelector((state) => state.productCategories);
  const {colors} = useSelector((state) => state.colors);
  const {images} = useSelector((state) => state.upload);

  const colorList = [];
  colors.forEach((item) => {
    colorList.push({
      _id: item._id,
      color: item.title,
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
      color: Yup.array().required("This field cannot be empty"),
    }),
    onSubmit: (values) => {
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
    formik.values.color = colorSelected.map((item) => item._id);
  }, [colorSelected]);

  useEffect(() => {
    setImageList(images?.data);
  }, [images?.data]);
  formik.values.images = imageList?.map((item) => ({
    public_id: item.public_id,
    url: item.url,
  }));

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
            >
              <option value="">Select brand</option>
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
            >
              <option value="">Select category</option>
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
          <div>
            <Multiselect
              dataKey="id"
              textField="color"
              data={colorList}
              placeholder="Select Color"
              onChange={(e) => setColorSelected(e)}
            />
            <p className="error">
              {formik.touched.color && formik.errors.color
                ? formik.errors.color
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
            <h6>Preview:</h6>
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
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

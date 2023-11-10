import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {
  deleteProduct,
  getAllProducts,
  resetDeletedProduct,
} from "../features/products/productSlice";
import {Link} from "react-router-dom";
import CustomModal from "../components/CustomModal";
import {toast} from "react-toastify";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.localeCompare(b.brand),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price.split(" ")[1] - b.price.split(" ")[1],
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();

  const {products, isLoading, isError, isSuccess, msg, deleted} = useSelector(
    (state) => state.products
  );

  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const data = products?.map((item, index) => ({
    key: index + 1,
    image: (
      <>
        <img
          style={{maxWidth: "80px", maxHeight: "80px"}}
          src={
            item?.images.length > 0
              ? item?.images[0]?.url
              : "https://shopnguyenlieumypham.com/wp-content/uploads/no-image/product-456x456.jpg"
          }
          alt=""
        />
      </>
    ),
    name: item?.title?.charAt(0).toUpperCase() + item?.title?.slice(1),
    brand: item?.brand?.charAt(0).toUpperCase() + item?.brand?.slice(1),
    category:
      item?.category?.charAt(0).toUpperCase() + item?.category?.slice(1),
    color: (
      <>
        {item?.color?.map((i, index) => (
          <span>{`${i?.title}${
            index < item?.color?.length - 1 ? ", " : ""
          }`}</span>
        ))}
      </>
    ),
    price: "$ " + item?.price,
    actions: (
      <>
        <Link
          to={`/admin/update-product/${item?._id}`}
          className="fs-4 text-primary"
        >
          <AiFillEdit />
        </Link>
        <button
          className="ms-4 fs-4 text-danger bg-transparent border-0"
          onClick={() => showModal(item?._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    if (deleted) {
      toast.success("Delete product successfully!");
      dispatch(resetDeletedProduct());
      dispatch(getAllProducts());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [deleted, isError]);

  return (
    <div>
      <h3 className="mb-4 title">Products List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
        <CustomModal
          title={"Confirm Delete?"}
          desc={"Are you sure want to delete this product?"}
          hideModal={hideModal}
          open={open}
          performAction={() => handleDelete(brandId)}
        />
      </div>
    </div>
  );
};

export default ProductList;

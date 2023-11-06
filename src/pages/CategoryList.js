import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {
  deleteCategory,
  getAllProductCategories,
  resetDeletedCategory,
} from "../features/productCategories/productCategorySlice";
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
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const CategoryList = () => {
  const dispatch = useDispatch();

  const {productCategories, isLoading, isError, isSuccess, msg, deleted} =
    useSelector((state) => state.productCategories);

  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setCategoryId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const data = productCategories?.map((item, index) => ({
    key: index + 1,
    name: item?.title?.charAt(0).toUpperCase() + item?.title?.slice(1),
    actions: (
      <>
        <Link
          to={`/admin/update-category/${item?._id}`}
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
    dispatch(deleteCategory(id));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllProductCategories());
  }, []);

  useEffect(() => {
    if (deleted) {
      toast.success("Delete category successfully!");
      dispatch(resetDeletedCategory());
      dispatch(getAllProductCategories());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [deleted, isError]);

  return (
    <div>
      <h3 className="mb-4 title">Categories List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
        <CustomModal
          title={"Confirm Delete?"}
          desc={"Are you sure want to delete this category?"}
          hideModal={hideModal}
          open={open}
          performAction={() => handleDelete(categoryId)}
        />
      </div>
    </div>
  );
};

export default CategoryList;

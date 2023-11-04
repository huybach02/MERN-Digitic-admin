import React, {useEffect} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {getAllProductCategories} from "../features/productCategories/productCategorySlice";

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

  const {productCategories, isLoading, isError, isSuccess, msg} = useSelector(
    (state) => state.productCategories
  );

  const data = productCategories?.map((item, index) => ({
    key: index + 1,
    name: item?.title?.charAt(0).toUpperCase() + item?.title?.slice(1),
    actions: (
      <>
        <Link to="/" className="fs-4 text-primary">
          <AiFillEdit />
        </Link>
        <Link className="ms-4 fs-4 text-danger" to="/">
          <AiFillDelete />
        </Link>
      </>
    ),
  }));

  useEffect(() => {
    dispatch(getAllProductCategories());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Categories List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default CategoryList;

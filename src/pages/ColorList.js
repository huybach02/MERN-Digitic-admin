import React, {useEffect} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {getAllColors} from "../features/colors/colorSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Color",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "SKU",
    dataIndex: "sku",
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const ColorList = () => {
  const dispatch = useDispatch();

  const {colors, isLoading, isError, isSuccess, msg} = useSelector(
    (state) => state.colors
  );

  const data = colors?.map((item, index) => ({
    key: index + 1,
    name: item?.title?.charAt(0).toUpperCase() + item?.title?.slice(1),
    sku: (
      <div className="">
        {item?.sku && (
          <div
            style={{
              backgroundColor: item?.sku,
              width: "100px",
              height: "20px",
              margin: "auto",
            }}
            className="border"
          ></div>
        )}
        <span>{item?.sku}</span>
      </div>
    ),
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
    dispatch(getAllColors());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Colors List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ColorList;

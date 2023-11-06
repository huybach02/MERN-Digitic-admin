import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {
  deleteColor,
  getAllColors,
  resetDeletedColor,
} from "../features/colors/colorSlice";
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

  const {colors, isLoading, isError, isSuccess, msg, deleted} = useSelector(
    (state) => state.colors
  );

  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setColorId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

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
        <Link
          to={`/admin/update-color/${item?._id}`}
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
    dispatch(deleteColor(id));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllColors());
  }, []);

  useEffect(() => {
    if (deleted) {
      toast.success("Delete color successfully!");
      dispatch(resetDeletedColor());
      dispatch(getAllColors());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [deleted, isError]);

  return (
    <div>
      <h3 className="mb-4 title">Colors List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
        <CustomModal
          title={"Confirm Delete?"}
          desc={"Are you sure want to delete this color?"}
          hideModal={hideModal}
          open={open}
          performAction={() => handleDelete(colorId)}
        />
      </div>
    </div>
  );
};

export default ColorList;

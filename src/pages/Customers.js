import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
  activeUser,
  blockUser,
  getAllUsers,
  resetActiveUser,
  resetBlockedUser,
} from "../features/customers/customerSlice";
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
    title: "Full name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: (a, b) => a.status.localeCompare(b.status),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Role",
    dataIndex: "role",
    sorter: (a, b) => a.role.localeCompare(b.role),
    sortDirections: ["descend", "ascend"],
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  const {customers, isLoading, isError, isSuccess, msg, blocked, active} =
    useSelector((state) => state.customers);
  console.log("customers: ", customers);

  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState("");
  console.log("customerId: ", customerId);

  const data = customers?.map((item, index) => ({
    key: index + 1,
    name: `${item?.firstname} ${item?.lastname}`,
    email: item?.email,
    phone: item?.mobile,
    status: item?.isBlocked ? (
      <div>
        <span>Blocked</span>
        <button
          className="btn btn-success ms-5"
          onClick={() => dispatch(activeUser(item?._id))}
        >
          Active
        </button>
      </div>
    ) : (
      <div>
        <span>Active</span>
        <button
          className="btn btn-danger ms-5"
          onClick={() => dispatch(blockUser(item?._id))}
        >
          Block
        </button>
      </div>
    ),
    role: item?.role,
  }));

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (blocked) {
      toast.success("Block user successfully!");
      dispatch(resetBlockedUser());
      dispatch(getAllUsers());
    }
    if (active) {
      toast.success("Active user successfully!");
      dispatch(resetActiveUser());
      dispatch(getAllUsers());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [blocked, active, isError]);

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Customers;

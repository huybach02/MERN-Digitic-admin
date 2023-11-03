import React, {useEffect} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../features/customers/customerSlice";

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
  const {customers, isLoading, isError, isSuccess, msg} = useSelector(
    (state) => state.customers
  );

  const data = customers?.map((item, index) => ({
    key: index + 1,
    name: `${item?.firstname} ${item?.lastname}`,
    email: item?.email,
    phone: item?.mobile,
    status: item?.isBlocked ? "Blocked" : "Active",
    role: item?.role,
  }));

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

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

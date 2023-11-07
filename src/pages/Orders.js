import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {
  getAllOrders,
  resetUpdatedOrderStatus,
  updateOrderStatus,
} from "../features/auth/authSlice";
import moment from "moment";
import {toast} from "react-toastify";

const statusOption = [
  "Confirmed",
  "Dispatched",
  "Processing",
  "Wait for pay",
  "Delivered",
  "Canceled",
];

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Customer",
    dataIndex: "customer",
  },
  {
    title: "Product Info",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount.split(" ")[1] - b.amount.split(" ")[1],
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  const {orders, isLoading, isError, isSuccess, msg, updated} = useSelector(
    (state) => state.auth
  );

  const data = orders?.map((item, index) => ({
    key: index + 1,
    customer: (
      <>
        <p className="mb-1 text-start">
          <strong>Name:</strong>{" "}
          {`${item?.orderBy?.firstname} ${item?.orderBy?.lastname}`}
        </p>
        <p className="mb-1 text-start">
          <strong>Email:</strong> {item?.orderBy?.email}
        </p>
        <p className="mb-1 text-start">
          <strong>Phone:</strong> {item?.orderBy?.mobile}
        </p>
        <p className="mb-1 text-start">
          <strong>Address:</strong> {item?.orderBy?.address}
        </p>
      </>
    ),
    product: <Link to={`/admin/order/${item?._id}`}>View Order</Link>,
    amount: "$ " + item?.paymentIntent?.amount,
    date: moment(item?.createdAt).format("DD/MM/YYYY, h:mm:ss A"),
    status: (
      <>
        <select
          className="form-control form-select"
          name=""
          id=""
          defaultValue={"abc"}
          onChange={(e) => setStatus({id: item?._id, status: e.target.value})}
        >
          <option value={item?.orderStatus}>{item?.orderStatus}</option>
          {statusOption
            .filter((i) => i !== item?.orderStatus)
            ?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
      </>
    ),
  }));

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  useEffect(() => {
    if (status) {
      dispatch(
        updateOrderStatus({id: status?.id, data: {status: status.status}})
      );
    }
  }, [status]);

  useEffect(() => {
    if (updated) {
      toast.success("Update order successfully!");
      dispatch(resetUpdatedOrderStatus());
      dispatch(getAllOrders());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isError, updated]);

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Orders;

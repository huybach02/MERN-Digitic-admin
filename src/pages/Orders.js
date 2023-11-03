import React, {useEffect} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {getAllOrders} from "../features/auth/authSlice";
import moment from "moment";

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
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  const {orders, isLoading, isError, isSuccess, msg} = useSelector(
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

    product: item?.products?.map((i, index) => (
      <div className="order-product d-flex ic gap-3 py-2">
        <span>{index + 1}.</span>
        <div className="d-flex flex-column gap-1">
          <p className="mb-1 text-start">
            <strong>Product: </strong>
            {i.product.title}
          </p>
          <p className="mb-1 text-start">
            <strong>Color: </strong>
            {i.color}
          </p>
          <p className="mb-1 text-start">
            <strong>Count: </strong>
            {i.count}
          </p>
        </div>
      </div>
    )),
    amount: "$ " + item?.paymentIntent?.amount,
    date: moment(item?.createdAt).format("DD/MM/YYYY, h:mm:ss A"),
    status: item?.orderStatus,
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
    dispatch(getAllOrders());
  }, []);

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

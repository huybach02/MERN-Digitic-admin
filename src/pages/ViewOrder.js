import React, {useEffect} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {getAllOrders, getOrderById} from "../features/auth/authSlice";
import moment from "moment";
import {useParams} from "react-router-dom";
import {resetBrandInfo} from "../features/brands/brandSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Into Money",
    dataIndex: "into",
  },
];

const ViewOrder = () => {
  const dispatch = useDispatch();
  const param = useParams();

  const {orderInfo} = useSelector((state) => state.auth);
  console.log("orderInfo: ", orderInfo);

  const data = orderInfo?.orderItems?.map((item, index) => ({
    key: index + 1,
    name: item?.product?.title,
    brand: item?.product?.brand,
    color: item?.color?.title,
    price: "$ " + item?.product?.price,
    quantity: item?.quantity,
    into: "$ " + item?.price * item?.quantity,
  }));

  useEffect(() => {
    if (param?.id) {
      dispatch(getOrderById(param?.id));
    } else {
      dispatch(resetBrandInfo());
    }
  }, [param?.id]);

  return (
    <div>
      <Link to={"/admin/orders"} className="btn btn-secondary">
        {"< "}Go back
      </Link>
      <h3 className="mt-3 mb-4 title d-flex align-items-center justify-content-between">
        <span>
          Detail Order By
          <strong>
            {" "}
            {orderInfo?.shippingInfo?.firstname}{" "}
            {orderInfo?.shippingInfo?.lastname}
          </strong>
        </span>
        <span>Total: $ {orderInfo?.totalPriceAfterDiscount}</span>
      </h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ViewOrder;

import React, {useEffect} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {getAllBrands} from "../features/brands/brandSlice";
import moment from "moment";
import {getAllCoupons} from "../features/coupons/couponSlice";

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
    title: "Expire",
    dataIndex: "expire",
  },
  {
    title: "% Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
    sortDirections: ["descend", "ascend"],
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

const CouponList = () => {
  const dispatch = useDispatch();

  const {coupons, isLoading, isError, isSuccess, msg} = useSelector(
    (state) => state.coupons
  );

  const data = coupons?.map((item, index) => ({
    key: index + 1,
    name: item?.name,
    expire: moment(item?.expire).format("DD/MM/YYYY, h:mm:ss A"),
    discount: item?.discount,
    status:
      Date.now() < new Date(item?.expire).getTime() ? "Active" : "Expired",
    actions: (
      <>
        <Link
          to={`/admin/update-coupon/${item?._id}`}
          className="fs-4 text-primary"
        >
          <AiFillEdit />
        </Link>
        <Link className="ms-4 fs-4 text-danger" to="/">
          <AiFillDelete />
        </Link>
      </>
    ),
  }));

  useEffect(() => {
    dispatch(getAllCoupons());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Coupon List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default CouponList;

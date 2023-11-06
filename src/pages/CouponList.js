import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import moment from "moment";
import {
  deleteCoupon,
  getAllCoupons,
  resetDeletedCoupon,
} from "../features/coupons/couponSlice";
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

  const {coupons, isLoading, isError, isSuccess, msg, deleted} = useSelector(
    (state) => state.coupons
  );

  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");

  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

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
    dispatch(deleteCoupon(id));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllCoupons());
  }, []);

  useEffect(() => {
    if (deleted) {
      toast.success("Delete coupon successfully!");
      dispatch(resetDeletedCoupon());
      dispatch(getAllCoupons());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [deleted, isError]);

  return (
    <div>
      <h3 className="mb-4 title">Coupon List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
        <CustomModal
          title={"Confirm Delete?"}
          desc={"Are you sure want to delete this coupon?"}
          hideModal={hideModal}
          open={open}
          performAction={() => handleDelete(brandId)}
        />
      </div>
    </div>
  );
};

export default CouponList;

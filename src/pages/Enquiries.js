import React, {useEffect} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {getAllBrands} from "../features/brands/brandSlice";
import {getAllEnquiries} from "../features/enquiry/enquirySlice";

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
    title: "Content",
    dataIndex: "content",
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

const Enquiries = () => {
  const dispatch = useDispatch();

  const {enquiries, isLoading, isError, isSuccess, msg} = useSelector(
    (state) => state.enquiries
  );

  const data = enquiries?.map((item, index) => ({
    key: index + 1,
    name: item?.name,
    email: item?.email,
    phone: item?.mobile,
    content: <p className="enquiry-content">{item?.comment}</p>,
    status: (
      <>
        <select className="form-control form-select" name="" id="">
          <option value="">{item?.status}</option>
        </select>
      </>
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
    dispatch(getAllEnquiries());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Enquiries;

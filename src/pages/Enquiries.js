import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {
  getAllEnquiries,
  resetUpdatedEnquiry,
  updateEnquiry,
} from "../features/enquiry/enquirySlice";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const statusOption = ["Submitted", "Contacted", "Progressing", "Finished"];

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
];

const Enquiries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const {enquiries, isLoading, isError, isSuccess, msg, updated} = useSelector(
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
        <select
          className="form-control form-select"
          name=""
          id=""
          onChange={(e) => setStatus({id: item?._id, status: e.target.value})}
        >
          <option value={item?.status}>{item?.status}</option>
          {statusOption
            .filter((i) => i !== item?.status)
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
    dispatch(getAllEnquiries());
  }, []);

  useEffect(() => {
    if (status) {
      dispatch(updateEnquiry({id: status?.id, data: {status: status.status}}));
    }
  }, [status]);

  useEffect(() => {
    if (updated) {
      toast.success("Update brand successfully!");
      dispatch(resetUpdatedEnquiry());
      dispatch(getAllEnquiries());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isError, updated]);

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

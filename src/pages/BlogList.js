import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {
  deleteBlog,
  getAllBlogs,
  resetDeletedBlog,
} from "../features/blogs/blogSlice";
import CustomModal from "../components/CustomModal";
import {toast} from "react-toastify";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Thumb",
    dataIndex: "thumb",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.localeCompare(b.category),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Views",
    dataIndex: "views",
    sorter: (a, b) => a.views - b.views,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Like",
    dataIndex: "likes",
    sorter: (a, b) => a.likes - b.likes,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Dislike",
    dataIndex: "dislikes",
    sorter: (a, b) => a.dislikes - b.dislikes,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const BlogList = () => {
  const dispatch = useDispatch();

  const {blogs, isLoading, isError, isSuccess, msg, deleted} = useSelector(
    (state) => state.blogs
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

  const data = blogs?.map((item, index) => ({
    key: index + 1,
    thumb: (
      <>
        <img
          style={{maxWidth: "80px", maxHeight: "80px"}}
          src={item?.images[0]?.url}
          alt=""
        />
      </>
    ),
    title: item?.title?.charAt(0).toUpperCase() + item?.title?.slice(1),
    category:
      item?.category?.charAt(0).toUpperCase() + item?.category?.slice(1),
    views: item?.numViews,
    likes: item?.likes?.length,
    dislikes: item?.dislikes?.length,
    actions: (
      <>
        <Link
          to={`/admin/update-blog/${item?._id}`}
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
    dispatch(deleteBlog(id));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  useEffect(() => {
    if (deleted) {
      toast.success("Delete blog successfully!");
      dispatch(resetDeletedBlog());
      dispatch(getAllBlogs());
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [deleted, isError]);

  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
        <CustomModal
          title={"Confirm Delete?"}
          desc={"Are you sure want to delete this blog?"}
          hideModal={hideModal}
          open={open}
          performAction={() => handleDelete(brandId)}
        />
      </div>
    </div>
  );
};

export default BlogList;

import React, {useEffect} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {getAllBrands} from "../features/brands/brandSlice";
import {getAllBlogs} from "../features/blogs/blogSlice";

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

  const {blogs, isLoading, isError, isSuccess, msg} = useSelector(
    (state) => state.blogs
  );

  const data = blogs?.map((item, index) => ({
    key: index + 1,
    thumb: (
      <>
        <img
          style={{maxWidth: "80px", maxHeight: "80px"}}
          src={item?.image}
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
    dispatch(getAllBlogs());
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default BlogList;

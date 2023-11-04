import axiosConfig from "../../utils/axiosConfig";

const getAllBlogs = async () => {
  const res = await axiosConfig.get(`/blog/`);

  return res.data.data;
};

const createBlog = async (data) => {
  const res = await axiosConfig.post(`/blog`, data);
  return res.data.data;
};

const blogService = {
  getAllBlogs,
  createBlog,
};

export default blogService;

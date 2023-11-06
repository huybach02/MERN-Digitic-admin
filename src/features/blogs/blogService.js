import axiosConfig from "../../utils/axiosConfig";

const getAllBlogs = async () => {
  const res = await axiosConfig.get(`/blog/`);

  return res.data.data;
};

const createBlog = async (data) => {
  const res = await axiosConfig.post(`/blog`, data);
  return res.data.data;
};

const getOneBlog = async (id) => {
  const res = await axiosConfig.get(`/blog/${id}`);
  return res.data.data;
};

const updateBlog = async ({id, data}) => {
  const res = await axiosConfig.put(`/blog/${id}`, data);
  return res.data.data;
};

const deleteBlog = async (id) => {
  const res = await axiosConfig.delete(`/blog/${id}`);
  return res.data.data;
};

const blogService = {
  getAllBlogs,
  createBlog,
  getOneBlog,
  updateBlog,
  deleteBlog,
};

export default blogService;

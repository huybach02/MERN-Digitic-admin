import axiosConfig from "../../utils/axiosConfig";

const getAllBlogCategories = async () => {
  const res = await axiosConfig.get(`/blog-category`);
  return res.data.data;
};

const createBlogCategory = async (data) => {
  const res = await axiosConfig.post(`/blog-category`, data);
  return res.data.data;
};

const getOneBlogCategory = async (id) => {
  const res = await axiosConfig.get(`/blog-category/${id}`);
  return res.data.data;
};

const updateBlogCategory = async ({id, data}) => {
  const res = await axiosConfig.put(`/blog-category/${id}`, data);
  return res.data.data;
};

const deleteBlogCategory = async (id) => {
  const res = await axiosConfig.delete(`/blog-category/${id}`);
  return res.data.data;
};

const blogCategoryService = {
  getAllBlogCategories,
  createBlogCategory,
  getOneBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};

export default blogCategoryService;

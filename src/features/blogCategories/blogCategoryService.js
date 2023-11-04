import axiosConfig from "../../utils/axiosConfig";

const getAllBlogCategories = async () => {
  const res = await axiosConfig.get(`/blog-category`);
  return res.data.data;
};

const createBlogCategory = async (data) => {
  const res = await axiosConfig.post(`/blog-category`, data);
  return res.data.data;
};

const blogCategoryService = {
  getAllBlogCategories,
  createBlogCategory,
};

export default blogCategoryService;

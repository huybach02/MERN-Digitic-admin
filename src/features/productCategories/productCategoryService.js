import axiosConfig from "../../utils/axiosConfig";

const getAllProductCategories = async () => {
  const res = await axiosConfig.get(`/category`);
  return res.data.data;
};

const createProductCategory = async (data) => {
  const res = await axiosConfig.post(`/category`, data);
  return res.data.data;
};

const productCategoryService = {
  getAllProductCategories,
  createProductCategory,
};

export default productCategoryService;

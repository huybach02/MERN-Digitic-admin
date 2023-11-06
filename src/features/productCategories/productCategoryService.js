import axiosConfig from "../../utils/axiosConfig";

const getAllProductCategories = async () => {
  const res = await axiosConfig.get(`/category`);
  return res.data.data;
};

const createProductCategory = async (data) => {
  const res = await axiosConfig.post(`/category`, data);
  return res.data.data;
};

const getOneProductCategory = async (id) => {
  const res = await axiosConfig.get(`/category/${id}`);
  return res.data.data;
};

const updateProductCategory = async ({id, data}) => {
  const res = await axiosConfig.put(`/category/${id}`, data);
  return res.data.data;
};

const deleteProductCategory = async (id) => {
  const res = await axiosConfig.delete(`/category/${id}`);
  return res.data.data;
};

const productCategoryService = {
  getAllProductCategories,
  createProductCategory,
  getOneProductCategory,
  updateProductCategory,
  deleteProductCategory,
};

export default productCategoryService;

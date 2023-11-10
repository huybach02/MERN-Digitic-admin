import axiosConfig from "../../utils/axiosConfig";

const getAllProducts = async () => {
  const res = await axiosConfig.get(`/product`);

  return res.data.data;
};

const createProducts = async (data) => {
  const res = await axiosConfig.post(`/product`, data);

  return res.data.data;
};

const getOneProduct = async (id) => {
  const res = await axiosConfig.get(`/product/${id}`);
  return res.data.data;
};

const updateProduct = async ({id, data}) => {
  const res = await axiosConfig.put(`/product/${id}`, data);
  return res.data.data;
};

const deleteProduct = async (id) => {
  const res = await axiosConfig.delete(`/product/${id}`);
  return res.data.data;
};

const productService = {
  getAllProducts,
  createProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};

export default productService;

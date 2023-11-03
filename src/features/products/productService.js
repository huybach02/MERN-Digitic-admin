import axiosConfig from "../../utils/axiosConfig";

const getAllProducts = async () => {
  const res = await axiosConfig.get(`/product`);

  return res.data.data;
};

const createProducts = async (data) => {
  const res = await axiosConfig.post(`/product`, data);

  return res.data.data;
};

const productService = {
  getAllProducts,
  createProducts,
};

export default productService;

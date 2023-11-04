import axiosConfig from "../../utils/axiosConfig";

const getAllBrands = async () => {
  const res = await axiosConfig.get(`/brand`);
  return res.data.data;
};

const createBrand = async (data) => {
  const res = await axiosConfig.post(`/brand`, data);
  return res.data.data;
};

const brandService = {
  getAllBrands,
  createBrand,
};

export default brandService;

import axiosConfig from "../../utils/axiosConfig";

const getAllBrands = async () => {
  const res = await axiosConfig.get(`/brand`);
  return res.data.data;
};

const createBrand = async (data) => {
  const res = await axiosConfig.post(`/brand`, data);
  return res.data.data;
};

const getOneBrand = async (id) => {
  const res = await axiosConfig.get(`/brand/${id}`);
  return res.data.data;
};

const updateBrand = async ({id, data}) => {
  const res = await axiosConfig.put(`/brand/${id}`, data);
  return res.data.data;
};

const deleteBrand = async (id) => {
  const res = await axiosConfig.delete(`/brand/${id}`);
  return res.data.data;
};

const brandService = {
  getAllBrands,
  createBrand,
  getOneBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;

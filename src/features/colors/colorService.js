import axiosConfig from "../../utils/axiosConfig";

const getAllColors = async () => {
  const res = await axiosConfig.get(`/color`);
  return res.data.data;
};

const createColor = async (data) => {
  const res = await axiosConfig.post(`/color`, data);
  return res.data.data;
};

const getOneColor = async (id) => {
  const res = await axiosConfig.get(`/color/${id}`);
  return res.data.data;
};

const updateColor = async ({id, data}) => {
  const res = await axiosConfig.put(`/color/${id}`, data);
  return res.data.data;
};

const deleteColor = async (id) => {
  const res = await axiosConfig.delete(`/color/${id}`);
  return res.data.data;
};

const colorService = {
  getAllColors,
  createColor,
  getOneColor,
  updateColor,
  deleteColor,
};

export default colorService;

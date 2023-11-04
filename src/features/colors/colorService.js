import axiosConfig from "../../utils/axiosConfig";

const getAllColors = async () => {
  const res = await axiosConfig.get(`/color`);
  return res.data.data;
};

const createColor = async (data) => {
  const res = await axiosConfig.post(`/color`, data);
  return res.data.data;
};

const colorService = {
  getAllColors,
  createColor,
};

export default colorService;

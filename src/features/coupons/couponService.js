import axiosConfig from "../../utils/axiosConfig";

const getAllCoupons = async () => {
  const res = await axiosConfig.get(`/coupon`);
  return res.data.data;
};

const createCoupon = async (data) => {
  const res = await axiosConfig.post(`/coupon`, data);
  return res.data.data;
};

const getOneCoupon = async (id) => {
  const res = await axiosConfig.get(`/coupon/${id}`);
  return res.data.data;
};

const updateCoupon = async ({id, data}) => {
  const res = await axiosConfig.put(`/coupon/${id}`, data);
  return res.data.data;
};

const deleteCoupon = async (id) => {
  const res = await axiosConfig.delete(`/coupon/${id}`);
  return res.data.data;
};

const couponService = {
  getAllCoupons,
  createCoupon,
  getOneCoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponService;

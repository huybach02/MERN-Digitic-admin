import axiosConfig from "../../utils/axiosConfig";

const getAllCoupons = async () => {
  const res = await axiosConfig.get(`/coupon`);
  return res.data.data;
};

const createCoupon = async (data) => {
  const res = await axiosConfig.post(`/coupon`, data);
  return res.data.data;
};

const couponService = {
  getAllCoupons,
  createCoupon,
};

export default couponService;

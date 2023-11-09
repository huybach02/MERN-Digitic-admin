// import axios from "axios";
import axiosConfig from "../../utils/axiosConfig";
// import {base_url} from "../../utils/base_url";
// import {config} from "../../utils/axiosConfig";

const login = async (data) => {
  const res = await axiosConfig.post(`/user/admin-login`, data);
  if (res.data.success) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const getAllOrders = async () => {
  const res = await axiosConfig.get(`/user/get-all-orders`);
  return res.data;
};

const getOrderById = async (id) => {
  const res = await axiosConfig.get(`/user/get-order-by-id/${id}`);
  return res.data.data;
};

const updateOrderStatus = async ({id, data}) => {
  const res = await axiosConfig.put(
    `/user/order/update-order-status/${id}`,
    data
  );
  return res.data.data;
};

const getMonthlyOrders = async () => {
  const res = await axiosConfig.get(`/user/getMonthWiseOrderIncome`);
  return res.data;
};

const authServices = {
  login,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getMonthlyOrders,
};

export default authServices;

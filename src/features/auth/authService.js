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

const authServices = {
  login,
  getAllOrders,
};

export default authServices;

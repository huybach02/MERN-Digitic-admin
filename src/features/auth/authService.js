import axios from "axios";
import {base_url} from "../../utils/base_url";

const login = async (data) => {
  const res = await axios.post(`${base_url}/user/admin-login`, data);
  if (res.data.success) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data.data;
};

const authServices = {
  login,
};

export default authServices;

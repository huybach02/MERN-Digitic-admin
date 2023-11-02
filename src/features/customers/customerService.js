import axios from "axios";
import {base_url} from "../../utils/base_url";

const getAllUsers = async () => {
  const res = await axios.get(`${base_url}/user/all-users`);

  return res.data.data;
};

const customerServices = {
  getAllUsers,
};

export default customerServices;

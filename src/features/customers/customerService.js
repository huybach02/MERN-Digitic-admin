import axiosConfig from "../../utils/axiosConfig";

const getAllUsers = async () => {
  const res = await axiosConfig.get(`/user/all-users`);

  return res.data.data;
};

const blockUser = async (id) => {
  const res = await axiosConfig.put(`/user/block-user/${id}`);

  return res.data.data;
};

const activeUser = async (id) => {
  const res = await axiosConfig.put(`/user/unblock-user/${id}`);

  return res.data.data;
};

const customerServices = {
  getAllUsers,
  blockUser,
  activeUser,
};

export default customerServices;

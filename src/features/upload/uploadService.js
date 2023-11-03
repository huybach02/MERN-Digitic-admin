import axiosConfig from "../../utils/axiosConfig";

const uploadImage = async (data) => {
  const res = await axiosConfig.put("/upload", data);
  return res.data;
};

const deleteImage = async (id) => {
  const res = await axiosConfig.delete("/upload/delete-image/" + id);
  return res.data;
};

const uploadService = {
  uploadImage,
  deleteImage,
};

export default uploadService;

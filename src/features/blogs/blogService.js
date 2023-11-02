import axios from "axios";
import {base_url} from "../../utils/base_url";

const getAllBlogs = async () => {
  const res = await axios.get(`${base_url}/blog/`);

  return res.data.data;
};

const blogService = {
  getAllBlogs,
};

export default blogService;

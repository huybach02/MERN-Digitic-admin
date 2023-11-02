import axios from "axios";
import {base_url} from "../../utils/base_url";

const getAllBlogCategories = async () => {
  const res = await axios.get(`${base_url}/blog-category/`);

  return res.data.data;
};

const blogCategoryService = {
  getAllBlogCategories,
};

export default blogCategoryService;

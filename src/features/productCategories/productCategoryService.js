import axios from "axios";
import {base_url} from "../../utils/base_url";

const getAllProductCategories = async () => {
  const res = await axios.get(`${base_url}/category/`);

  return res.data.data;
};

const productCategoryService = {
  getAllProductCategories,
};

export default productCategoryService;

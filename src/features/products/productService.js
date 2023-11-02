import axios from "axios";
import {base_url} from "../../utils/base_url";

const getAllProducts = async () => {
  const res = await axios.get(`${base_url}/product/`);

  return res.data.data;
};

const productService = {
  getAllProducts,
};

export default productService;

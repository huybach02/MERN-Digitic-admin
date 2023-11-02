import axios from "axios";
import {base_url} from "../../utils/base_url";

const getAllBrands = async () => {
  const res = await axios.get(`${base_url}/brand/`);

  return res.data.data;
};

const brandService = {
  getAllBrands,
};

export default brandService;

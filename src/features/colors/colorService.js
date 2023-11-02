import axios from "axios";
import {base_url} from "../../utils/base_url";

const getAllColors = async () => {
  const res = await axios.get(`${base_url}/color/`);

  return res.data.data;
};

const colorService = {
  getAllColors,
};

export default colorService;

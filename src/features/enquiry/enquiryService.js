import axios from "axios";
import {base_url} from "../../utils/base_url";

const getAllEnquiries = async () => {
  const res = await axios.get(`${base_url}/enquiry/`);

  return res.data.data;
};

const enquiryService = {
  getAllEnquiries,
};

export default enquiryService;

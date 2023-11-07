import axiosConfig from "../../utils/axiosConfig";

const getAllEnquiries = async () => {
  const res = await axiosConfig.get(`/enquiry`);

  return res.data.data;
};

const updateEnquiry = async ({id, data}) => {
  const res = await axiosConfig.put(`/enquiry/${id}`, data);
  return res.data.data;
};

const enquiryService = {
  getAllEnquiries,
  updateEnquiry,
};

export default enquiryService;

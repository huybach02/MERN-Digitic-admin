import axios from "axios";
import {toast} from "react-toastify";
import {base_url} from "./base_url";

const instance = axios.create({
  baseURL: base_url,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let localStorageData = localStorage.getItem("user");

    localStorageData = JSON.parse(localStorageData);
    const token = localStorageData?.data?.token;
    config.headers = {Authorization: `Bearer ${token}`};
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response?.status || 500;
    console.log("status: ", status);
    switch (status) {
      // authentication (token related issues)
      case 401: {
        toast.error("Unauthorized user. Please login");
        // window.location.href = "/login";
        return error && error.response.data;
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error("You don't have permission to access");
        return error && error.response.data;
      }

      // bad request
      case 400: {
        return Promise.reject(error);
      }

      // not found
      case 404: {
        return Promise.reject(error);
      }

      // conflict
      case 409: {
        return Promise.reject(error);
      }

      // unprocessable
      case 422: {
        return Promise.reject(error);
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(error);
      }
    }
  }
);

export default instance;

// const getTokenFromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

// export const config = {
//   headers: {
//     Authorization: `Bearer ${
//       getTokenFromLocalStorage !== null
//         ? getTokenFromLocalStorage?.data?.token
//         : ""
//     }`,
//     Accept: "application/json",
//   },
// };

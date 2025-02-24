import axios from "axios";
import Swal from "sweetalert2";

export const Request = axios.create({
  baseURL: "http://localhost:3005",
  // baseURL: "http://16.170.239.246/api",
});

const useHtpp = () => {
  function configureHeaders() {
    Request.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
  const configureInterceptors = () => {
    Request.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const backendMessage = error.response?.data?.message || "Something went wrong";
        const statusCode = error.response?.status;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: backendMessage,
        });
        console.error(`API Error (status: ${statusCode}):`, error.response?.data || error);
        return Promise.reject(error);
      }

    );
  };
  return { configureHeaders, configureInterceptors };
};

export default useHtpp;

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // To show SweetAlert2 notifications
import { Apis } from "../../lib/Apis";

const useLogin = () => {
  const navigate = useNavigate();

  const loginUser = async (body) => {
    try {
      const response = await Apis.login(body);

      if (response && response.data.token) {
        localStorage.setItem("token", response.data.token);

        Swal.fire({
          title: "Success!",
          text: "You have successfully logged in.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Invalid email or password!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return { loginUser };
};

export default useLogin;

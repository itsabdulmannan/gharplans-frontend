import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Apis } from "../../lib/Apis";
import { loginSuccess } from "../../redux/slice/authSlice";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async (body) => {
    try {
      const response = await Apis.login(body);

      if (response && response.data.token) {
        localStorage.setItem("token", response.data.token);
        dispatch(loginSuccess());

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

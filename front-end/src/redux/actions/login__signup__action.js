import axios from "axios";
import swal from "sweetalert";
import { LOGOUT } from "./../constants/redux__const";

export const login__action = (user, navigate) => {
  return async () => {
    try {
      const res = await axios.post("http://localhost:2222/authenticate", user);
      localStorage.setItem("token", res.data.token);
      swal("", "Đăng Nhập Thành Công", "success").then(() => {
        navigate("/");
        window.location.reload();
      });
    } catch (error) {
      if (error?.response?.status === 400) {
        swal("", "Mật Khẩu Hoặc Tài khoản Không Đúng", "error");
      } else if (error?.response?.status === 500) {
        swal("", "Server có vấn đề", "error");
      } else {
        swal("", "Đăng Nhập Thất Bại", "error");
      }
    }
  };
};

export const logout__action = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      dispatch({
        type: LOGOUT,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const signup__action = (user) => {
  return async () => {
    try {
      const res = await axios.post("http://localhost:2222/register", user);
      swal("", "Đăng Ký Thành Công", "success").then(() => {
        window.location.assign("/login").then(() => {
          window.location.reload();
        });
      });
    } catch (error) {
      if (error?.response?.status === 400) {
        swal("", "Đã tồn tại tài khoản hoặc email này", "error");
      } else if (error?.response?.status === 500) {
        swal("", "Server có vấn đề", "error");
      } else {
        swal("", "Đăng Ký Thất Bại", "error");
      }
    }
  };
};

import axios from "axios";
import swal from "sweetalert";
import { login__error, signup__error } from "../../utils/error__handler";
import { LOGOUT } from "./../constants/redux__const";
import { add__local__cart__action } from "./cart__action";
import { reset__want__to__pay__action } from "./invoice__action";

export const login__action = (user, navigate, want__to__pay) => {
  return async (dispatch) => {
    try {
      const cart__storage = JSON.parse(localStorage.getItem("cart__storage"));
      const res = await axios.post("http://localhost:2222/authenticate", user);
      localStorage.setItem("token", res.data.token);
      swal("", "Đăng Nhập Thành Công", "success").then(() => {
        navigate("/");
        window.location.reload();
      });
      if (want__to__pay && cart__storage && cart__storage.length > 0) {
        dispatch(add__local__cart__action(cart__storage));
        reset__want__to__pay__action(dispatch);
      }
    } catch (error) {
      login__error(error);
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
      console.log(error?.response);
    }
  };
};

export const signup__action = (user) => {
  return async () => {
    try {
      await axios.post("http://localhost:2222/register", user);
      swal("", "Đăng Ký Thành Công", "success").then(() => {
        window.location.assign("/login").then(() => {
          window.location.reload();
        });
      });
    } catch (error) {
      signup__error(error);
    }
  };
};

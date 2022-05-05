import axios from "axios";
import swal from "sweetalert";
import { GET__CART } from "./../constants/redux__const";
import { user__error } from "./../../utils/error__handler";

export const add__cart = (product) => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:2222/api/cart/", product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      swal("", "Thêm vào giỏ hàng thành công", "success");
    } catch (error) {
      user__error(error);
    }
  };
};

export const add__local__cart__action = (local__cart) => {
  return async (dispatch) => {
    try {
      await axios({
        url: "http://localhost:2222/api/cart/addLocal/",
        data: local__cart,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("cart__storage");
    } catch (error) {
      user__error(error);
    }
  };
};

export const get__carts__action = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:2222/api/cart/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch({
        type: GET__CART,
        payload: res.data,
      });
    } catch (error) {
      user__error(error);
    }
  };
};

export const delete__cart = (arr) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "delete",
        url: "http://localhost:2222/api/cart/",
        data: arr,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      swal("", "Xóa khỏi giỏ hàng thành công", "success").then(() => {
        window.location.assign("/cart").then(() => {
          window.location.reload();
        });
      });
    } catch (error) {
      user__error(error);
    }
  };
};

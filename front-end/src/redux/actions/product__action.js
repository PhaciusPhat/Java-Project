import axios from "axios";
import swal from "sweetalert";
import { GET__PRODUCT, GET__PRODUCTS } from "./../constants/redux__const";

export const get__products__action = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:2222/api/product/");
      dispatch({
        type: GET__PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      swal("", "Lỗi kết nối", "error");
    }
  };
};

export const get__pt__products__action = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:2222/api/product/findByProductType/${id}`
      );
      dispatch({
        type: GET__PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      swal("", "Lỗi kết nối", "error");
    }
  };
};

export const find__products__action = (find) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:2222/api/product/find?p_name=${find}`
      );
      dispatch({
        type: GET__PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      swal("", "Lỗi kết nối", "error");
    }
  };
}


export const get__product__action = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:2222/api/product/${id}`);
      dispatch({
        type: GET__PRODUCT,
        payload: res.data,
      });
    } catch (error) {
      swal("", "Lỗi kết nối", "error").then(() => {
        window.location.href = "/";
      });
    }
  };
};

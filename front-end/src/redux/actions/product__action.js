import axios from "axios";
import swal from "sweetalert";
import {
  FIND__PRODUCT,
  GET__PRODUCT,
  GET__PRODUCTS,
} from "./../constants/redux__const";
import { product__error } from "./../../utils/error__handler";

export const get__products__action = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:2222/api/product/");
      dispatch({
        type: GET__PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      product__error(error);
    }
  };
};

export const get__products__admin__action = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:2222/admin/product/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({
        type: GET__PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      product__error(error);
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
      product__error(error);
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
      product__error(error);
    }
  };
};

export const find__header__products__action = (find) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:2222/api/product/find?p_name=${find}`
      );
      dispatch({
        type: FIND__PRODUCT,
        payload: res.data,
      });
    } catch (error) {
      product__error(error);
    }
  };
};

export const get__product__action = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:2222/api/product/${id}`);
      dispatch({
        type: GET__PRODUCT,
        payload: res.data,
      });
    } catch (error) {
      product__error(error);
    }
  };
};

export const add__product__action = (newProduct, id, isAdd) => {
  return async (dispatch) => {
    try {
      await axios({
        url: isAdd
          ? "http://localhost:2222/admin/product/"
          : `http://localhost:2222/admin/product/${id}`,
        method: isAdd ? "POST" : "PUT",
        data: newProduct,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      swal(
        "",
        isAdd ? "Thêm sản phẩm thành công" : "Cập nhật sản phẩm thành công",
        "success"
      ).then(() => {
        window.location.assign("/admin__product");
      });
    } catch (error) {
      product__error(error);
    }
  };
};

export const delete__product__action = (id) => {
  return async (dispatch) => {
    try {
      await axios({
        url: `http://localhost:2222/admin/product/active/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      swal("", "Thao tác thành công", "success").then(() => {
        window.location.assign("/admin__product");
      });
    } catch (error) {
      product__error(error);
    }
  };
};

export const find__products__by__pt__and__name__action = (name, pt_id) => {
  return async (dispatch) => {
    try {
      const url =
        Number(pt_id) === -1
          ? `http://localhost:2222/admin/product/find?p_name=${name}`
          : `http://localhost:2222/admin/product/findProductListByNameAndProductTypeId?p_name=${name}&pt_id=${pt_id}`;
      const res = await axios({
        url: url,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({
        type: GET__PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      product__error(error);
    }
  };
};

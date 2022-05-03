import axios from "axios";
import swal from "sweetalert";
import { product__type__error } from "../../utils/error__handler";
import { GET__PRODUCTTYPE, GET__PRODUCTTYPES } from "../constants/redux__const";

export const get__product__types__action = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:2222/api/product-type/");
      dispatch({
        type: GET__PRODUCTTYPES,
        payload: res.data,
      });
    } catch (error) {
      product__type__error(error);
    }
  };
};

export const get__product__type__action = (id) => {
  return async (dispatch) => {
    try {
      let res = id
        ? await axios({
            method: "get",
            url: `http://localhost:2222/admin/product-type/${id}`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        : { data: {} };
      dispatch({
        type: GET__PRODUCTTYPE,
        payload: res.data,
      });
    } catch (error) {
      product__type__error(error);
    }
  };
};

export const add__product__type__action = (product__type, id, isAdd) => {
  return async (dispatch) => {
    try {
      await axios({
        url: isAdd
          ? "http://localhost:2222/admin/product-type/"
          : `http://localhost:2222/admin/product-type/${id}`,
        method: isAdd ? "post" : "put",
        data: product__type,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      swal(
        "",
        isAdd ? "Thêm thành công" : "Cập nhật thành công",
        "success"
      ).then(() => {
        window.location.assign("/admin__product__type").then(() => {
          window.location.reload();
        });
      });
    } catch (error) {
      product__type__error(error);
    }
  };
};

export const delete__product__type__action = (id) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:2222/admin/product-type/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      swal("", "Xóa thành công", "success").then(() => {
        window.location.assign("/admin__product__type").then(() => {
          window.location.reload();
        });
      });
    } catch (error) {
      product__type__error(error);
    }
  };
};

export const find__product__types__action = (keyword) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:2222/admin/product-type/find?pt_name=${keyword}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({
        type: GET__PRODUCTTYPES,
        payload: res.data,
      });
    } catch (error) {
      product__type__error(error);
    }
  };
};

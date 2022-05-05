import axios from "axios";
import swal from "sweetalert";
import { invoice__error } from "../../utils/error__handler";
import {
  GET__INVOICE,
  GET__USER__INVOICES,
  GET__USER__INVOICE,
  GET__INVOICES,
  WANT__TO__PAY,
} from "../constants/redux__const";
import { endLoadingAction, startLoadingAction } from "./common__action";

export const create__invoice__action = (data, isNullToken) => {
  return async (dispatch) => {
    try {
      if (isNullToken) {
        swal("", "Vui lòng đăng nhập để thanh toán", "warning").then(() => {
          want__to__pay__action(dispatch);
        });
        return;
      }

      startLoadingAction(dispatch);
      await axios({
        method: "POST",
        url: "http://localhost:2222/api/invoice/",
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      endLoadingAction(dispatch);
      swal("", "Đặt hàng thành công", "success").then(() => {
        window.location.assign("/").then(() => {
          window.location.reload();
        });
      });
    } catch (error) {
      endLoadingAction(dispatch);
      invoice__error(error);
    }
  };
};

export const get__user__invoices__action = () => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:2222/api/invoice/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({
        type: GET__USER__INVOICES,
        payload: response.data,
      });
    } catch (error) {
      invoice__error(error);
    }
  };
};

export const get__user__invoice__action = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:2222/api/invoice/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({
        type: GET__USER__INVOICE,
        payload: response.data,
      });
    } catch (error) {
      invoice__error(error);
    }
  };
};

export const get__account__invoices__action = () => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:2222/admin/invoice/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({
        type: GET__INVOICES,
        payload: response.data,
      });
    } catch (error) {
      invoice__error(error);
    }
  };
};

export const get__account__invoice__action = (id) => {
  return async (dispatch) => {
    try {
      console.log(id);
      const response = await axios({
        method: "GET",
        url: `http://localhost:2222/admin/invoice/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({
        type: GET__USER__INVOICE,
        payload: response.data,
      });
    } catch (error) {
      invoice__error(error);
    }
  };
};

export const find__invoices__action = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:2222/admin/invoice/findByDateAndUser?start_date=${data.start_date}&end_date=${data.end_date}&user_name=${data.user_name}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({
        type: GET__INVOICES,
        payload: response.data,
      });
    } catch (error) {
      invoice__error(error);
    }
  };
};

export const update__invoice = (id) => {
  return async (dispatch) => {
    try {
      // startLoadingAction(dispatch);
      await axios({
        method: "PUT",
        url: `http://localhost:2222/api/invoice/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // endLoadingAction(dispatch);
      swal("", "Cập nhật thành công", "success").then(() => {
        window.location.assign("/user").then(() => {
          window.location.reload();
        });
      });
    } catch (error) {
      // endLoadingAction(dispatch);
      invoice__error(error);
    }
  };
};

export const want__to__pay__action = (dispatch) => {
  dispatch({
    payload: true,
    type: WANT__TO__PAY,
  });
};

export const reset__want__to__pay__action = (dispatch) => {
  dispatch({
    payload: false,
    type: WANT__TO__PAY,
  });
};

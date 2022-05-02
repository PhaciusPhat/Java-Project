import axios from "axios";
import swal from "sweetalert";
import { GET__INVOICE , GET__USER__INVOICES, GET__USER__INVOICE, GET__INVOICES } from "../constants/redux__const";

const handleError = (error) => {
  console.log(error);
  if (error?.response?.status === 401) {
    swal("", "Phiên Đăng Nhập Hết Hạn", "error").then(() => {
      localStorage.removeItem("token");
      window.location.assign("/").then(() => {
        window.location.reload();
      });
    });
  }
  if (error?.response?.status === 403) {
    swal("", "Bạn không có quyền hạn này", "error").then(() => {
      localStorage.removeItem("token");
      window.location.assign("/").then(() => {
        window.location.reload();
      });
    });
  } else if (error?.response?.status === 404) {
    swal("", "Không tìm dữ liệu", "error").then(() => {
      window.location.assign("/").then(() => {
        window.location.reload();
      });
    });
  } else if (error?.response?.status === 400) {
    swal("", "Không đủ số lượng trong kho", "error");
  } else {
    swal("", "Lỗi Server", "error").then(() => {
      window.location.assign("/").then(() => {
        window.location.reload();
      });
    });
  }
};

export const create__invoice__action = (data) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "POST",
        url: "http://localhost:2222/api/invoice/",
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      swal("", "Đặt hàng thành công", "success");
    } catch (error) {
      handleError(error);
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
      handleError(error);
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
      handleError(error);
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
      handleError(error);
    }
  };
};

export const get__account__invoice__action = (id) => {
  return async (dispatch) => {
    try {
      console.log(id)
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
      handleError(error);
    }
  };
};

import axios from "axios";
import swal from "sweetalert";
import { GET__CART } from "./../constants/redux__const";

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
      console.log(error.message);
      if (error?.response?.status === 401) {
        swal("", "Phiên Đăng Nhập Hết Hạn", "error");
        localStorage.removeItem("token");
        window.location.assign("/").then(() => {
          window.location.reload();
        });
      } else if (error?.response?.status === 404) {
        swal("", "Không tìm thấy tài khoản của bạn", "error");
      } else {
        swal("", "Lỗi Server", "error");
      }
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
      console.log(error.message);
      if (error?.response?.status === 401) {
        swal("", "Phiên Đăng Nhập Hết Hạn", "error");
        localStorage.removeItem("token");
        window.location.assign("/").then(() => {
          window.location.reload();
        });
      } else if (error?.response?.status === 404) {
        swal("", "Không tìm thấy tài khoản của bạn", "error");
      } else {
        swal("", "Lỗi Server", "error");
      }
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
      if (error?.response?.status === 401) {
        swal("", "Phiên Đăng Nhập Hết Hạn", "error");
        localStorage.removeItem("token");
        window.location.assign("/").then(() => {
          window.location.reload();
        });
      } else if (error?.response?.status === 404) {
        swal("", "Không tìm thấy tài khoản của bạn", "error");
      } else {
        swal("", "Lỗi Server", "error");
      }
    }
  };
};

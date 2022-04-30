import axios from "axios";
import swal from "sweetalert";
import { GET__PRODUCT, GET__PRODUCTS } from "./../constants/redux__const";

const handleError = (error) => {
  console.log(error?.response);
  if (error?.response?.status === 401) {
    swal("", "Phiên Đăng Nhập Hết Hạn", "error").then(() => {
      localStorage.removeItem("token");
      window.location.assign("/").then(() => {
        window.location.reload();
      });
    });
  } else if (error?.response?.status === 404) {
    swal("", "Không tìm dữ liệu", "error").then(() => {
      window.location.assign("/404").then(() => {
        window.location.reload();
      });
    });
  } else if (error?.response?.status === 400) {
    swal("", "Đã tồn tại sản phẩm này", "error");
  } else {
    swal("", "Lỗi Server", "error").then(() => {
      window.location.assign("/").then(() => {
        window.location.reload();
      });
    });
  }
};

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
      swal("", "Lỗi kết nối", "error").then(() => {
        window.location.href = "/";
      });
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
      handleError(error);
    }
  };
};

export const delete__product__action = (id) => {
  return async (dispatch) => {
    try {
      await axios({
        url: `http://localhost:2222/admin/product/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      swal("", "Xóa sản phẩm thành công", "success").then(() => {
        window.location.assign("/admin__product");
      });
    } catch (error) {
      handleError(error);
    }
  };
};

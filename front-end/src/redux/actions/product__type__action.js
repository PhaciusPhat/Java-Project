import axios from "axios";
import swal from "sweetalert";
import { GET__PRODUCTTYPE, GET__PRODUCTTYPES } from "../constants/redux__const";
const handleError = (error) => {
  console.log(error);
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
    swal("", "Đã tồn tại loại sản phẩm này", "error");
  } else {
    swal("", "Lỗi Server", "error").then(() => {
      window.location.assign("/").then(() => {
        window.location.reload();
      });
    });
  }
};

export const get__product__types__action = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:2222/api/product-type/");
      dispatch({
        type: GET__PRODUCTTYPES,
        payload: res.data,
      });
    } catch (error) {
      swal("", "Lỗi kết nối", "error");
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
      handleError(error);
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
      handleError(error);
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
      console.log(error);
      if (error?.response?.status === 401) {
        swal("", "Phiên Đăng Nhập Hết Hạn", "error");
        localStorage.removeItem("token");
        window.location.assign("/").then(() => {
          window.location.reload();
        });
      } else if (error?.response?.status === 404) {
        swal("", "Không tìm thấy tài khoản của bạn", "error");
      } else if (error?.response?.status === 400) {
        swal("", "Không thể xóa loại sản phẩm này", "error");
      } else {
        swal("", "Lỗi Server", "error");
      }
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
      handleError(error);
    }
  };
};

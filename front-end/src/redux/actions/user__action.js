import axios from "axios";
import swal from "sweetalert";
import { GET__INFO, GET__USER, GET__USERS } from "./../constants/redux__const";

const handleError = (error) => {
  console.log(error.response);
  if (error?.response?.status === 401) {
    swal("", "Phiên Đăng Nhập Hết Hạn", "error").then(() => {
      localStorage.removeItem("token");
      window.location.assign("/").then(() => {
        window.location.reload();
      });
    });
  } else if (error?.response?.status === 404) {
    swal("", "Không tìm thấy tài khoản của bạn", "error");
  } else if (error?.response?.status === 400) {
    swal(
      "Không thể thực hiện tác vụ này",
      "",
      "error"
    );
  } else {
    swal("", "Lỗi Server", "error");
  }
};

export const get__info__action = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const res = await axios({
          url: "http://localhost:2222/api/user/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // localStorage.setItem("user", JSON.stringify(res.data));

        dispatch({
          type: GET__INFO,
          payload: res.data,
        });
      }
    } catch (error) {
      handleError(error);
    }
  };
};

export const change__info = (user) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios({
          url: "http://localhost:2222/api/user/",
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: user,
        });
        swal("", "Cập nhật thành công", "success").then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      handleError(error);
    }
  };
};

export const change__pass = (user) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios({
          url: "http://localhost:2222/api/user/change-password",
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: user,
        });
        swal("", "Thay đổi mật khẩu thành công", "success").then(() => {
          window.location.assign("/user").then(() => {
            window.location.reload();
          });
        });
      }
    } catch (error) {
      console.log(error.message);
      if (error?.response?.status === 401) {
        swal("", "Phiên Đăng Nhập Hết Hạn", "error").then(() => {
          localStorage.removeItem("token");
          window.location.assign("/").then(() => {
            window.location.reload();
          });
        });
      } else if (error?.response?.status === 400) {
        swal("", "Sai mật khẩu", "error");
      } else if (error?.response?.status === 404) {
        swal("", "Không tìm thấy tài khoản của bạn", "error");
      } else {
        swal("", "Lỗi Server", "error");
      }
    }
  };
};

export const get__users__action = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios({
          url: "http://localhost:2222/admin/user/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({
          type: GET__USERS,
          payload: res.data,
        });
      }
    } catch (error) {
      handleError(error);
    }
  };
};

export const get__user__info__action = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios({
          url: `http://localhost:2222/admin/user/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({
          type: GET__USER,
          payload: res.data,
        });
      }
    } catch (error) {
      handleError(error);
    }
  };
};

export const update__user__action = (user, id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios({
          url: `http://localhost:2222/admin/user/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: user,
        });
        swal("", "Cập nhật thành công", "success").then(() => {
          window.location.assign("/admin__account").then(() => {
            window.location.reload();
          });
        });
      }
    } catch (error) {
      handleError(error);
    }
  };
};

export const delete__user__action = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios({
          url: `http://localhost:2222/admin/user/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        swal("", "Xóa thành công", "success").then(() => {
          window.location.assign("/admin__account").then(() => {
            window.location.reload();
          });
        });
      }
    } catch (error) {
      handleError(error);
    }
  };
};

export const find__user__action = (keyword) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios({
          url: `http://localhost:2222/admin/user/find?user_name=${keyword}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch({
          type: GET__USERS,
          payload: res.data,
        });
      }
    } catch (error) {
      handleError(error);
    }
  };
};

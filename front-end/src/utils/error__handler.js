import swal from "sweetalert";

export const login__error = (error) => {
  console.log(
    error?.response?.data?.message !== undefined
      ? error?.response?.data?.message
      : error?.response?.data
  );
  if (error?.response?.status === 400) {
    swal("", "Mật Khẩu Hoặc Tài khoản Không Đúng", "error");
  } else if (error?.response?.status === 500) {
    swal("", "Server có vấn đề", "error");
  } else {
    swal("", "Đăng Nhập Thất Bại", "error");
  }
};

export const signup__error = (error) => {
  console.log(
    error?.response?.data?.message !== undefined
      ? error?.response?.data?.message
      : error?.response?.data
  );
  if (error?.response?.status === 400) {
    swal("", "Đã tồn tại tài khoản hoặc email này", "error");
  } else if (error?.response?.status === 500) {
    swal("", "Server có vấn đề", "error");
  } else {
    swal("", "Đăng Ký Thất Bại", "error");
  }
};

export const product__error = (error) => {
  console.log(
    error?.response?.data?.message !== undefined
      ? error?.response?.data?.message
      : error?.response?.data
  );
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
    swal(
      "",
      error?.response?.data?.message !== undefined
        ? "Đã tồn tại sản phẩm này"
        : "file ảnh quá lớn chọn file khác (dưới 2GB)",
      "error"
    );
  } else if (error?.response?.status === 403) {
    swal("", "Bạn không có quyền truy cập", "error").then(() => {
      window.location.assign("/").then(() => {
        window.location.reload();
      });
    });
  } else {
    swal("", "Lỗi Server", "error").then(() => {
      window.location.assign("/").then(() => {
        window.location.reload();
      });
    });
  }
};

export const product__type__error = (error) => {
  console.log(
    error?.response?.data?.message !== undefined
      ? error?.response?.data?.message
      : error?.response?.data
  );
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
    swal("", "Đã tồn loại sản phẩm này", "error");
  } else if (error?.response?.status === 403) {
    swal("", "Bạn không có quyền truy cập", "error").then(() => {
      window.location.assign("/").then(() => {
        window.location.reload();
      });
    });
  } else {
    swal("", "Lỗi Server", "error").then(() => {
      window.location.assign("/").then(() => {
        window.location.reload();
      });
    });
  }
};

export const user__error = (error) => {
  console.log(
    error?.response?.data?.message !== undefined
      ? error?.response?.data?.message
      : error?.response?.data
  );
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
    swal("", "Không thể thực hiện tác vụ này", "error");
  } else if (error?.response?.status === 403) {
    swal("", "Bạn không có quyền truy cập", "error").then(() => {
      window.location.assign("/").then(() => {
        window.location.reload();
      });
    });
  } else {
    swal("", "Lỗi Server", "error").then(() => {
      window.location.assign("/").then(() => {
        window.location.reload();
      });
    });
  }
};

export const invoice__error = (error) => {
  console.log(
    error?.response?.data?.message !== undefined
      ? error?.response?.data?.message
      : error?.response?.data
  );
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
      window.location.assign("/404").then(() => {
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

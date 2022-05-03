import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get__info__action } from "../../redux/actions/user__action";
import swal from "sweetalert";

function Authorize__router() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.user__reducer);
  useEffect(() => {
    dispatch(get__info__action());
  }, [dispatch]);
  const navigate__to__route = () => {
    if (token) {
      if (user?.user_role === "ADMIN" || user?.user_role === "SUPER_ADMIN") {
        return <Outlet />;
      } else {
        swal("", "Bạn không có quyền truy cập", "error").then(() => {
          window.location.href = "/";
        });
      }
    } else {
      swal("", "Bạn chưa đăng nhập", "error").then(() => {
        window.location.href = "/login";
      });
    }
  };

  return <>{navigate__to__route()}</>;
}

export default Authorize__router;

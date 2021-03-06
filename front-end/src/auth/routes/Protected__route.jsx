import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get__info__action } from "../../redux/actions/user__action";
import swal from "sweetalert";

const Protected__route = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const navigate__to__route = () => {
    if (token) {
      return <Outlet />;
    } else {
      swal("", "Bạn chưa đăng nhập", "error").then(() => {
        window.location.href = "/login";
      });
    }
  };

  useEffect(() => {
    dispatch(get__info__action());
  }, [dispatch]);

  return <>{navigate__to__route()}</>;
};

export default Protected__route;

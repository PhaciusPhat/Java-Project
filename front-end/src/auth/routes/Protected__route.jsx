import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get__info__action } from "../../redux/actions/user__action";

const Protected__route = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(get__info__action());
  }, [dispatch]);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Protected__route;

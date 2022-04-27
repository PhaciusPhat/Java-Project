import React, { useEffect } from "react";
import "./Admin__header.scss";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout__action } from "../../redux/actions/login__signup__action";

function Admin__header({choose}) {
  const { user } = useSelector((state) => state.user__reducer);
  const dispatch = useDispatch();
  const renderChoice = () => {
    const arr = document.getElementsByClassName(
      "admin__header__navigation__item"
    );
    for (let item of arr) {
      item.classList.remove("active");
    }
    arr[choose]?.classList.add("active");
  };

  useEffect(() => {
    renderChoice();
  });

  return (
    <>
      <div className="admin__header__container">
        <div className="admin__header__info">
          <div className="header__logo">
            <img src="./images/logo.png" alt="" srcSet="" />
          </div>
          <div className="header__info">
            <div className="header__info__name">
              {" "}
              <AiOutlineUser /> {user.user_name}
            </div>
            <div
              className="header__info__logout"
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(logout__action());
                window.location.assign("/");
              }}
            >
              Đăng xuất
            </div>
          </div>
        </div>
        <hr />
        <div className="admin__header__navigation">
          <a href="/" className="admin__header__navigation__item">
            Thống kê
          </a>
          <a href="/" className="admin__header__navigation__item">
            Quản lý tài khoản
          </a>
          <a href="/" className="admin__header__navigation__item">
            Quản lý sản phẩm
          </a>
          <a href="/" className="admin__header__navigation__item">
            Quản lý loại sản phẩm
          </a>
        </div>
      </div>
    </>
  );
}

export default Admin__header;

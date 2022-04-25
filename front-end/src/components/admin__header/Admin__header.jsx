import React from "react";
import "./Admin__header.scss";
import { AiOutlineUser } from "react-icons/ai";

function Admin__header(props) {
  return (
    <>
      <div className="admin__header__container">
        <div className="admin__header__info">
          <div className="header__logo">
            <img src="./images/logo.png" alt="" srcSet="" />
          </div>
          <div className="header__info">
            <div className="header__info__name"> <AiOutlineUser/> Yusuki</div>
            <div className="header__info__logout">Đăng xuất</div>
          </div>
        </div>
        <hr />
        <div className="admin__header__navigation">
            <a href="/" className="admin__header__navigation__item active">Thống kê</a>
            <a href="/" className="admin__header__navigation__item">Quản lý tài khoản</a>
            <a href="/" className="admin__header__navigation__item">Quản lý sản phẩm</a>
            <a href="/" className="admin__header__navigation__item">Quản lý loại sản phẩm</a>
        </div>
      </div>
    </>
  );
}

export default Admin__header;

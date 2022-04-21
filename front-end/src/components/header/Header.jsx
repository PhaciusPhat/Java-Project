import React from "react";
import { BiSearchAlt, BiCartAlt } from "react-icons/bi";
import "./Header.scss";
function Header() {
  return (
    <>
      <div className="header__container">
        <div className="header__logo">
          <a href="/">
            <img src="../images/logo.png" alt="" srcSet="" />
          </a>
        </div>
        <form className="header__input">
          <input type="text" placeholder="Tìm Kiếm" />
          <button type="submit">
            <BiSearchAlt />
          </button>
        </form>
        <div className="header__navigation">
          <ul>
            <li>
              <a href="/">Đăng Nhập/ Đăng Ký</a>
            </li>
            <li>
              <a href="/">
                <BiCartAlt />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;

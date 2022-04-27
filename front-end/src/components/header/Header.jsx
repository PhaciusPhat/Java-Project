import React, { useEffect, useState } from "react";
import { BiSearchAlt, BiCartAlt } from "react-icons/bi";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { find__products__action } from "../../redux/actions/product__action";
import { get__info__action } from "../../redux/actions/user__action";
import { logout__action } from "../../redux/actions/login__signup__action";
function Header() {
  const { user } = useSelector((state) => state.user__reducer);
  const dispatch = useDispatch();

  const renderNavigation = () => {
    if (user.user_name) {
      return (
        <div className="header__navigation">
          <ul>
            <li>
              <Link to="/user">Xin chào {user.user_name}</Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  dispatch(logout__action());
                }}
              >
                Đăng xuất
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <BiCartAlt />
              </Link>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <div className="header__navigation">
        <ul>
          <li>
            <Link to="/login">Đăng Nhập/ Đăng Ký</Link>
          </li>
          <li>
            <Link to="/cart">
              <BiCartAlt />
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const [find, setFind] = useState("");

  const handleChange = (e) => {
    setFind(e.target.value);
  };

  useEffect(() => {
    dispatch(get__info__action());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // window.location.href = "/";
    // dispatch(find__products__action(find));
  };

  return (
    <>
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img src="../images/logo.png" alt="" srcSet="" />
          </Link>
        </div>
        <form className="header__input">
          <input
            type="text"
            placeholder="Tìm Kiếm"
            name="find"
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            <BiSearchAlt />
          </button>
        </form>
        {renderNavigation()}
      </div>
    </>
  );
}

export default Header;

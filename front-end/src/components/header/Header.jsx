import React, { useEffect, useRef, useState } from "react";
import { BiSearchAlt, BiCartAlt } from "react-icons/bi";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  find__header__products__action,
  find__products__action,
} from "../../redux/actions/product__action";
import { get__info__action } from "../../redux/actions/user__action";
import { logout__action } from "../../redux/actions/login__signup__action";
import { useOnClickOutside } from "usehooks-ts";
import { priceFormatter } from "../../utils/helpers";
function Header() {
  const { user } = useSelector((state) => state.user__reducer);
  const dispatch = useDispatch();
  const { header__find__product } = useSelector(
    (state) => state.product__reducer
  );
  const ref = useRef(null);
  const render__role = () => {
    if (user.user_role === "ADMIN" || user.user_role === "SUPER_ADMIN") {
      return (
        <li>
          <Link to="/admin">Quản lý</Link>
        </li>
      );
    } else {
      return <></>;
    }
  };

  const handleClickOutside = (e) => {
    document.getElementsByClassName("find__container")[0].style.display =
      "none";
  };

  const handleClickInside = (e) => {
    e.target.parentElement.children[1].style.display = "flex";
  };

  useOnClickOutside(ref, handleClickOutside);

  const renderNavigation = () => {
    if (user.user_name) {
      return (
        <div className="header__navigation">
          <ul>
            <li>
              <Link to="/user">Xin chào {user.user_name}</Link>
            </li>
            {render__role()}
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

  const render__find__product = () => {
    return header__find__product?.map((item) => {
      return (
        <a
          href={`/product/${item.p_id}`}
          key={item.p_id}
          onClick={handleClickOutside}
        >
          <div className="find__product">
            <img src={item.p_img} alt="" />
            <div className="find__product__info">
              <p>{item.p_name}</p>
              <p>{priceFormatter(item.p_price)}</p>
            </div>
          </div>
        </a>
      );
    });
  };

  const handleChange = (e) => {
    setFind(e.target.value);
    dispatch(find__header__products__action(e.target.value));
  };

  useEffect(() => {
    dispatch(get__info__action());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(find__header__products__action(find));
  };

  return (
    <>
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img src="../images/logo.png" alt="" srcSet="" />
          </Link>
        </div>
        <form className="header__input" ref={ref} onClick={handleClickInside}>
          <input
            type="text"
            placeholder="Tìm Kiếm"
            name="find"
            onChange={handleChange}
          />
          <div className="find__container">{render__find__product()}</div>
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

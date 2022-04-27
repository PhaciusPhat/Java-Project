import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signup__action } from "../../redux/actions/login__signup__action";

function Sign__up() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    user_username: "",
    user_password: "",
    user_phone: "",
    user_name: "",
    user_email: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup__action(user));
  };

  return (
    <>
      <div className="login__sign-up__container">
        <div className="left">
          <div className="login__sign-up__header">
            <div className="login__sign-up__logo">
              <Link to="/">
                <img src="../images/logo.png" alt="" srcSet="" />
              </Link>
            </div>
            <div className="login__sign-up__title">Đăng Ký</div>
          </div>
          <form className="login__sign-up__form">
            {/* input area */}
            <div className="login__sign-up__input">
              {/* username */}
              <div className="form__input__group">
                <label htmlFor="user_username">TÀI KHOẢN</label>
                <input
                  type="text"
                  name="user_username"
                  onChange={handleChange}
                />
              </div>
              {/* email */}
              <div className="form__input__group">
                <label htmlFor="user_email">EMAIL</label>
                <input type="text" name="user_email" onChange={handleChange} />
              </div>
              {/* name */}
              <div className="form__input__group">
                <label htmlFor="user_name">TÊN</label>
                <input type="text" name="user_name" onChange={handleChange} />
              </div>
              {/* password */}
              {/* <div className="form__input__group">
                <label htmlFor="re-password">NHẬP LẠI MẬT KHẨU</label>
                <input type="password" name="re-password" />
              </div> */}
              {/* password */}
              <div className="form__input__group">
                <label htmlFor="user_password">MẬT KHẨU</label>
                <input
                  type="password"
                  name="user_password"
                  onChange={handleChange}
                />
              </div>
              {/* phone */}
              <div className="form__input__group">
                <label htmlFor="user_phone">SỐ ĐIỆN THOẠI</label>
                <input
                  type="number"
                  name="user_phone"
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* button area */}
            <div className="login__sign-up__button">
              {/* login */}
              <button type="submit" onClick={handleSubmit}>
                Đăng Ký
              </button>
              {/* google login */}
              {/* <button></button> */}
              {/* sign-up */}
              <Link to="/login">Đã Có Tài Khoản? Đăng Nhập!</Link>
            </div>
          </form>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
}

export default Sign__up;

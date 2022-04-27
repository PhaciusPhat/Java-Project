import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login__action } from "../../redux/actions/login__signup__action";
import "./Login.scss";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(login__action(user, navigate));
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
            <div className="login__sign-up__title">Đăng Nhập</div>
          </div>
          <form className="login__sign-up__form">
            {/* input area */}
            <div className="login__sign-up__input">
              {/* username */}
              <div className="form__input__group">
                <label htmlFor="username">TÀI KHOẢN</label>
                <input type="text" name="username" onChange={handleChange} />
              </div>
              {/* password */}
              <div className="form__input__group">
                <label htmlFor="password">MẬT KHẨU</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* button area */}
            <div className="login__sign-up__button">
              {/* login */}
              <button type="submit" onClick={login}>
                Đăng Nhập
              </button>
              {/* google login */}
              {/* <button></button> */}
              {/* sign-up */}
              <Link to="/sign-up">Chưa có tài khoản? Đăng ký!</Link>
            </div>
          </form>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
}

export default Login;

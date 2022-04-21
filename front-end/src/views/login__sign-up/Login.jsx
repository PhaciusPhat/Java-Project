import React from "react";
import "./Login.scss";

function Login() {
  return (
    <>
      <div className="login__sign-up__container">
        <div className="left">
        <div className="login__sign-up__header">
            <div className="login__sign-up__logo">
              <a href="/">
                <img src="../images/logo.png" alt="" srcset="" />
              </a>
            </div>
            <div className="login__sign-up__title">Đăng Nhập</div>
          </div>
          <form className="login__sign-up__form">
            {/* input area */}
            <div className="login__sign-up__input">
              {/* username */}
              <div className="form__input__group">
                <label htmlFor="username">TÀI KHOẢN</label>
                <input type="text" name="username"/>
              </div>
              {/* password */}
              <div className="form__input__group">
                <label htmlFor="password">MẬT KHẨU</label>
                <input type="password" name="password"/>
              </div>
            </div>
            {/* button area */}
            <div className="login__sign-up__button">
              {/* login */}
              <button type="submit">Đăng Nhập</button>
              {/* google login */}
              {/* <button></button> */}
              {/* sign-up */}
              <a href="/">Chưa có tài khoản? Đăng ký!</a>
            </div>
          </form>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
}

export default Login;

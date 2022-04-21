import React from "react";

function Sign__up() {
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
            <div className="login__sign-up__title">Đăng Ký</div>
          </div>
          <form className="login__sign-up__form">
            {/* input area */}
            <div className="login__sign-up__input">
              {/* username */}
              <div className="form__input__group">
                <label htmlFor="username">TÀI KHOẢN</label>
                <input type="text" name="username" />
              </div>
              {/* email */}
              <div className="form__input__group">
                <label htmlFor="email">EMAIL</label>
                <input type="text" name="email" />
              </div>
              {/* name */}
              <div className="form__input__group">
                <label htmlFor="name">TÊN</label>
                <input type="text" name="name" />
              </div>
              {/* password */}
              <div className="form__input__group">
                <label htmlFor="re-password">NHẬP LẠI MẬT KHẨU</label>
                <input type="password" name="re-password" />
              </div>
              {/* password */}
              <div className="form__input__group">
                <label htmlFor="password">MẬT KHẨU</label>
                <input type="password" name="password" />
              </div>
              {/* phone */}
              <div className="form__input__group">
                <label htmlFor="phone">SỐ ĐIỆN THOẠI</label>
                <input type="number" name="phone" />
              </div>
            </div>
            {/* button area */}
            <div className="login__sign-up__button">
              {/* login */}
              <button type="submit">Đăng Ký</button>
              {/* google login */}
              {/* <button></button> */}
              {/* sign-up */}
              <a href="/">Đã Có Tài Khoản? Đăng Nhập!</a>
            </div>
          </form>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
}

export default Sign__up;

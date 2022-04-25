import React from "react";
import "./Change__pass.scss";
function Change__pass() {
  return (
    <>
      <div className="login__sign-up__container">
        <div className="left">
          <div className="login__sign-up__header">
            <div className="login__sign-up__logo">
              <a href="/">
                <img src="../images/logo.png" alt="" srcSet="" />
              </a>
            </div>
            <div className="login__sign-up__title">Thay đổi mật khẩu</div>
          </div>
          <form className="login__sign-up__form">
            {/* input area */}
            <div className="login__sign-up__input">
              {/* username */}
              <div className="form__input__group">
                <label htmlFor="username">TÀI KHOẢN</label>
                <input type="text" name="username" />
              </div>
              {/* password */}
              <div className="form__input__group">
                <label htmlFor="password">MẬT KHẨU</label>
                <input type="password" name="password" />
              </div>
              {/* new password */}
              <div className="form__input__group">
                <label htmlFor="new__password">MẬT KHẨU MỚI</label>
                <input type="password" name="new__password" />
              </div>
              {/* re new password */}
              <div className="form__input__group">
                <label htmlFor="re__new__password">NHẬP LẠI MẬT KHẨU MỚI</label>
                <input type="password" name="re__new__password" />
              </div>
            </div>
            {/* button area */}
            <div className="login__sign-up__button">
              {/* login */}
              <button type="submit">Thay đổi mật khẩu</button>
            </div>
          </form>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
}

export default Change__pass;

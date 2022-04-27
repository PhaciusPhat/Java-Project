import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { change__pass } from "../../redux/actions/user__action";
import "./Change__pass.scss";
function Change__pass() {
  const { user } = useSelector((state) => state.user__reducer);
  const dispatch = useDispatch();

  const test = {};

  test.username = user.user_username;

  const handleChange = (e) => {
    test[e.target.name] = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(change__pass(test));
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
            <div className="login__sign-up__title">Thay đổi mật khẩu</div>
          </div>
          <form className="login__sign-up__form">
            {/* input area */}
            <div className="login__sign-up__input">
              {/* username */}
              <div className="form__input__group">
                <label htmlFor="username">TÀI KHOẢN</label>
                <input
                  type="text"
                  name="username"
                  defaultValue={user.user_username}
                />
              </div>
              {/* password */}
              <div className="form__input__group">
                <label htmlFor="old_password">MẬT KHẨU</label>
                <input
                  type="password"
                  name="old_password"
                  onChange={handleChange}
                />
              </div>
              {/* new password */}
              <div className="form__input__group">
                <label htmlFor="new_password">MẬT KHẨU MỚI</label>
                <input
                  type="password"
                  name="new_password"
                  onChange={handleChange}
                />
              </div>
              {/* re new password */}
              {/* <div className="form__input__group">
                <label htmlFor="re__new__password">NHẬP LẠI MẬT KHẨU MỚI</label>
                <input type="password" name="re__new__password" />
              </div> */}
            </div>
            {/* button area */}
            <div className="login__sign-up__button">
              {/* login */}
              <button type="submit" onClick={handleSubmit}>
                Thay đổi mật khẩu
              </button>
            </div>
          </form>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
}

export default Change__pass;

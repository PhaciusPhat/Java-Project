import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { add__local__cart__action } from "../../redux/actions/cart__action";
import { login__action } from "../../redux/actions/login__signup__action";
import { regexPassword, regexUsername } from "../../utils/regex";
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

  const { want__to__pay } = useSelector((state) => state.invoice__reducer);
  const login = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(login__action(user, navigate, want__to__pay));
    }
  };

  const validate = () => {
    const { username, password } = user;
    if (username.length === 0 || password.length === 0) {
      swal("", "điền đầy đủ thông tin", "error");
      return false;
    } else {
      if (username.match(regexUsername) === null) {
        swal(
          "",
          "username phải có ít nhất 6 ký tự và không có ký tự đặc biệt",
          "error"
        );
        return false;
      }
      if (password.match(regexPassword) === null) {
        swal(
          "",
          "password phải có ít nhất 6 ký tự và có chứa 1 ký tự số",
          "error"
        );
        return false;
      }
      return true;
    }
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
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  pattern="/^[a-zA-Z0-9]{6,}$/"
                />
              </div>
              {/* password */}
              <div className="form__input__group">
                <label htmlFor="password">MẬT KHẨU</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
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
              <button>Đăng nhập Google</button>
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

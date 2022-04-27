import React from "react";
import "./User.scss";
import Header from "./../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { change__info } from "../../redux/actions/user__action";
import { Link } from "react-router-dom";
function User() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user__reducer);

  const test = user;

  const handleChange = (e) => {
    test[e.target.name] = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(change__info(test));
  };

  return (
    <>
      <Header />
      <div className="user__container">
        <form className="user__container__left">
          <div className="user__container__info">
            <div className="user__container__input">
              <label htmlFor="">Tên Tài Khoản</label>
              <input type="text" defaultValue={user.user_username} readOnly />
            </div>
            <div className="user__container__input">
              <label htmlFor="">Họ và tên</label>
              <input
                type="text"
                defaultValue={user.user_name}
                name="user_name"
                onChange={handleChange}
              />
            </div>
            <div className="user__container__input">
              <label htmlFor="">Số Điện Thoại</label>
              <input
                type="number"
                defaultValue={user.user_phone}
                name="user_phone"
                onChange={handleChange}
              />
            </div>
            <div className="user__container__input">
              <label htmlFor="">Email</label>
              <input
                type="text"
                defaultValue={user.user_email}
                name="user_email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="user__container__button">
            <button type="submit" onClick={handleSubmit}>
              Lưu
            </button>
          </div>
        </form>
        <div className="user__container__right">
          <div className="user__container__right__header">
            <div className="user__container__right__header___title">
              Đổi mật khẩu
            </div>
            <button><Link to="/change-pass">Đổi Mật Khẩu</Link></button>
          </div>
          <div className="user__container__right__footer">
            <div className="user__container__right__footer___title">
              Danh sách hóa đơn
            </div>
            <div className="user__invoices">
              <div className="user__invoice">
                <div className="user__invoice__item">Mã HD: 1</div>
                <div className="user__invoice__item">Tổng tiền: 100.000đ</div>
                <div className="user__invoice__item">Ngày tạo: 20/10/2020</div>
                <div className="user__invoice__item user__invoice__item__btn">
                  <button>Xem chi tiết</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;

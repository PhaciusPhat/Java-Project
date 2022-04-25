import React from "react";
import "./User.scss";
import Header from "./../../components/header/Header";
function User() {
  return (
    <>
      <Header />
      <div className="user__container">
        <form className="user__container__left">
          <div className="user__container__info">
            <div className="user__container__input">
              <label htmlFor="">Tên Tài Khoản</label>
              <input type="text" defaultValue={""} readOnly />
            </div>
            <div className="user__container__input">
              <label htmlFor="">Họ và tên</label>
              <input type="text" defaultValue={""} />
            </div>
            <div className="user__container__input">
              <label htmlFor="">Số Điện Thoại</label>
              <input type="text" defaultValue={""} />
            </div>
            <div className="user__container__input">
              <label htmlFor="">Email</label>
              <input type="text" defaultValue={""} />
            </div>
          </div>
          <div className="user__container__button">
            <button type="submit">Lưu</button>
          </div>
        </form>
        <div className="user__container__right">
          <div className="user__container__right__header">
            <div className="user__container__right__header___title">
              Đổi mật khẩu
            </div>
            <button>Đổi Mật Khẩu</button>
          </div>
          <div className="user__container__right__footer">
            <div className="user__container__right__footer___title">Danh sách hóa đơn</div>
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

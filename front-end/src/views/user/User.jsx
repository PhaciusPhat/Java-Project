import React, { useEffect } from "react";
import "./User.scss";
import Header from "./../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { change__info } from "../../redux/actions/user__action";
import { Link } from "react-router-dom";
import {
  get__user__invoices__action,
  update__invoice,
} from "../../redux/actions/invoice__action";
import { dateFormat } from "../../utils/helpers";
import swal from "sweetalert";
import { regexEmail, regexName, regexPhone } from "../../utils/regex";
import { priceFormatter } from './../../utils/helpers';
function User() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user__reducer);
  const { user__invoices } = useSelector((state) => state.invoice__reducer);

  const handleChange = (e) => {
    user[e.target.name] = e.target.value;
  };

  const validate = (e) => {
    for (const key in user) {
      if (user[key] === "") {
        swal("", "điền đầy đủ thông tin", "error");
        return false;
      }
    }
    if (user.user_phone.match(regexPhone) === null) {
      swal("", "số điện thoại không hợp lệ", "error");
      return false;
    }
    if (user.user_email.match(regexEmail) === null) {
      swal("", "email không hợp lệ", "error");
      return false;
    }
    if (user.user_name.match(regexName) === null) {
      swal("", "tên phải có ít nhất 6 ký tự", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(change__info(user));
    }
  };

  const render__invoice = () => {
    return user__invoices?.map((invoice) => {
      const ts = new Date(invoice.createdDate);
      return (
        <div className="user__invoice" key={invoice.iv_id}>
          <div className="user__invoice__item">Mã HD: {invoice.iv_id}</div>
          <div className="user__invoice__item">
            Tổng tiền: {priceFormatter(invoice.iv_total)}
          </div>
          <div className="user__invoice__item">
            Ngày đặt hàng: {dateFormat(ts)}
          </div>
          <div className="user__invoice__item">
            {invoice.iv_status ? "đã nhận hàng" : "Chưa nhận hàng"}
          </div>
          <div className="user__invoice__item user__invoice__item__btn">
            {invoice.iv_status ? (
              <></>
            ) : (
              <button
                onClick={() => {
                  dispatch(update__invoice(invoice.iv_id));
                }}
              >
                Nhận hàng
              </button>
            )}
          </div>
          <div className="user__invoice__item user__invoice__item__btn">
            <button>
              <a href={"/user/invoice/" + invoice.iv_id}>Xem chi tiết</a>
            </button>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    dispatch(get__user__invoices__action());
  }, [dispatch]);

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
            <button>
              <Link to="/change-pass">Đổi Mật Khẩu</Link>
            </button>
          </div>
          <div className="user__container__right__footer">
            <div className="user__container__right__footer___title">
              Danh sách hóa đơn
            </div>
            <div className="user__invoices">{render__invoice()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;

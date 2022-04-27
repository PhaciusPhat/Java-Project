import React from "react";
import Admin__find__tool from "./../admin__find__tool/Admin__find__tool";
import Admin__header from './../admin__header/Admin__header';
import "../../views/admin/Admin.scss";
function Admin__account() {
  return (
    <>
      <Admin__header />
      <div className="admin__container">
        <Admin__find__tool />
        <div className="admin__table">
          <div className="table__title">
            <div className="table__item">Tài khoản</div>
            <div className="table__item">Họ và Tên</div>
            <div className="table__item">Email</div>
            <div className="table__item">Số điện thoại</div>
            <div className="table__item">Chức vụ</div>
            <div className="table__item">Thao tác</div>
          </div>
          <div className="table__database__list">
            <div className="table__database">
              <div className="table__item">yusuki</div>
              <div className="table__item">Nguyễn Văn A</div>
              <div className="table__item">yusuki@gmail.com</div>
              <div className="table__item">099</div>
              <div className="table__item">Dân Đen</div>
              <div className="table__item">
                <button>Xem chi tiết</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin__account;

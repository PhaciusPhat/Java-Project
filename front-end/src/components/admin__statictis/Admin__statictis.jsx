import React from "react";
import "../../views/admin/Admin.scss";
import Admin__find__tool from "./../admin__find__tool/Admin__find__tool";
import Admin__header from './../admin__header/Admin__header';
function Admin__statictis() {
  return (
    <>
      <Admin__header />
      <div className="admin__container">
        <Admin__find__tool />
        <div className="admin__table">
          <div className="table__title">
            <div className="table__item">Mã HD</div>
            <div className="table__item">Người mua</div>
            <div className="table__item">Tổng Tiền</div>
            <div className="table__item">Ngày mua</div>
            <div className="table__item">Thao tác</div>
          </div>
          <div className="table__database__list">
            <div className="table__database">
              <div className="table__item">HD001</div>
              <div className="table__item">Nguyễn Văn A</div>
              <div className="table__item">1.000.000</div>
              <div className="table__item">20/10/2020</div>
              <div className="table__item">
                <button>Xem chi tiết</button>
              </div>
            </div>
            <div className="table__database">
              <div className="table__item">HD001</div>
              <div className="table__item">Nguyễn Văn A</div>
              <div className="table__item">1.000.000</div>
              <div className="table__item">20/10/2020</div>
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

export default Admin__statictis;

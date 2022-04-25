import React from "react";
import Admin__find__tool from "./../admin__find__tool/Admin__find__tool";
import Paginate from './../paginate/Paginate';

function Admin__product() {
  return (
    <>
      <div className="admin__container">
        <Admin__find__tool />
        <div className="admin__table">
          <Paginate />
          <button className="add__data">Thêm</button>
          <div className="table__title">
            <div className="table__item">Mã sản phẩm</div>
            <div className="table__item">Tên sản phẩm</div>
            <div className="table__item">Giá</div>
            <div className="table__item">Số lượng</div>
            <div className="table__item">Loại sản phẩm</div>
            <div className="table__item">Thao tác</div>
          </div>
          <div className="table__database__list">
            <div className="table__database">
              <div className="table__item">1</div>
              <div className="table__item">Đồng hồ nam</div>
              <div className="table__item">1.000.000</div>
              <div className="table__item">100</div>
              <div className="table__item">Đồng hồ nam</div>
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

export default Admin__product;

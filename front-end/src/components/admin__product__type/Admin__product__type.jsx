import React, { useEffect } from "react";
import Admin__find__tool from "./../admin__find__tool/Admin__find__tool";
import "./Admin__product__type.scss";
import Paginate from "./../paginate/Paginate";
import Admin__header from "./../admin__header/Admin__header";
import "../../views/admin/Admin.scss";
import { useDispatch, useSelector } from "react-redux";
import { get__product__types__action } from "../../redux/actions/product__type__action";
function Admin__product__type() {
  const dispatch = useDispatch();

  const { product__types } = useSelector(
    (state) => state.product__type__reducer
  );

  useEffect(() => {
    dispatch(get__product__types__action());
  }, [dispatch]);

  const renderProductTypes = () => {
    return product__types?.map((product__type) => {
      return (
        <div className="table__database" key={product__type.pt_id}>
          <div className="table__item">{product__type.pt_id}</div>
          <div className="table__item">{product__type.pt_name}</div>
          <div className="table__item">
            <button>Xem chi tiết</button>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Admin__header choose={3} />
      <div className="admin__container">
        <Admin__find__tool arr={[0]} />
        <div className="admin__table">
          {/* <Paginate /> */}
          <button className="add__data">Thêm</button>
          <div className="table__title">
            <div className="table__item">Mã loại sản phẩm</div>
            <div className="table__item">Tên loại sản phẩm</div>
            <div className="table__item">Thao tác</div>
          </div>
          <div className="table__database__list">{renderProductTypes()}</div>
        </div>
      </div>
    </>
  );
}

export default Admin__product__type;

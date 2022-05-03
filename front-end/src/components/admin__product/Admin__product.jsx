import React, { useEffect } from "react";
import Admin__header from "../admin__header/Admin__header";
import Admin__find__tool from "./../admin__find__tool/Admin__find__tool";
import Paginate from "./../paginate/Paginate";
import "../../views/admin/Admin.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  find__products__action,
  find__products__by__pt__and__name__action,
  get__products__action,
} from "../../redux/actions/product__action";
import { priceFormatter } from "../../utils/helpers";
function Admin__product() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product__reducer);

  useEffect(() => {
    dispatch(get__products__action());
  }, [dispatch]);

  const renderProductList = () => {
    return products?.map((product) => {
      return (
        <div className="table__database" key={product.p_id}>
          <div className="table__item">{product.p_id}</div>
          <div className="table__item">{product.p_name}</div>
          <div className="table__item">{priceFormatter(product.p_price)}</div>
          <div className="table__item">{product.p_number}</div>
          <div className="table__item">{product.product_type.pt_name}</div>
          <div className="table__item">
            <button>
              <a href={"/admin__product/form/" + product.p_id}>Xem chi tiết</a>
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Admin__header choose={2} />
      <div className="admin__container">
        <Admin__find__tool arr={[0, 1, 5]} findFunc={find__products__by__pt__and__name__action} />

        <button className="add__data">
          <a href={"/admin__product/form/"}>Thêm</a>
        </button>
        <div className="admin__table">
          {/* <Paginate /> */}
          <div className="table__title">
            <div className="table__item">Mã sản phẩm</div>
            <div className="table__item">Tên sản phẩm</div>
            <div className="table__item">Giá</div>
            <div className="table__item">Số lượng</div>
            <div className="table__item">Loại sản phẩm</div>
            <div className="table__item">Thao tác</div>
          </div>
          <div className="table__database__list">{renderProductList()}</div>
        </div>
      </div>
    </>
  );
}

export default Admin__product;

import React, { useEffect } from "react";
import "../../views/admin/Admin__form.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { priceFormatter } from "./../../utils/helpers";

function Invoice__form(props) {
  const { get__invoice, back__link } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  let total = 0;
  const { user__invoice } = useSelector((state) => state.invoice__reducer);
  const render__invoice = () => {
    return user__invoice?.map((invoice) => {
      total += invoice.products.p_price * invoice.number;
      return (
        <div className="table__database" key={invoice.products.p_id}>
          <div className="table__item">{invoice.products.p_name}</div>
          <div className="table__item">
            <img src={invoice.products.p_img} alt="" />
          </div>
          <div className="table__item">
            {priceFormatter(invoice.products.p_price)}
          </div>
          <div className="table__item">{invoice.number}</div>
          <div className="table__item">
            {priceFormatter(invoice.products.p_price * invoice.number)}
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    dispatch(get__invoice(id));
  }, [dispatch]);

  return (
    <>
      <div className="admin__container">
        <button className="back__btn">
          <a href={back__link}>Trở về</a>
        </button>
        <div className="admin__table">
          <div className="table__title">
            <div className="table__item">Tên SP</div>
            <div className="table__item">Hình ảnh</div>
            <div className="table__item">Số Lượng</div>
            <div className="table__item">Giá Tiền</div>
            <div className="table__item">Tổng tiền</div>
          </div>
          <div className="table__database__list">
            {render__invoice()}
            <div className="table__database">
              <div className="table__item">
                Tổng Tiền: {priceFormatter(total)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoice__form;

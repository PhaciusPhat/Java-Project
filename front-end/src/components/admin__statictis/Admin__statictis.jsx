import React, { useEffect } from "react";
import "../../views/admin/Admin.scss";
import Admin__find__tool from "./../admin__find__tool/Admin__find__tool";
import Admin__header from "../admin__header/Admin__header";
import { useDispatch, useSelector } from "react-redux";

import { get__account__invoices__action } from "../../redux/actions/invoice__action";
import { dateFormat, priceFormatter } from "./../../utils/helpers";

function Admin__statictis() {
  const dispatch = useDispatch();

  const { invoices } = useSelector((state) => state.invoice__reducer);

  const render__invoices = () => {
    return invoices?.map((invoice) => {
      return (
        <div className="table__database" key={invoice.iv_id}>
          <div className="table__item">{invoice.iv_id}</div>
          <div className="table__item">{invoice.userDTO.user_name}</div>
          <div className="table__item">{priceFormatter(invoice.iv_total)}</div>
          <div className="table__item">
            {dateFormat(new Date(invoice.createdDate))}
          </div>
          <div className="table__item">
            {invoice.iv_status ? "đã nhận hàng" : "Chưa nhận hàng"}
          </div>
          <div className="table__item">
            <button
            // onClick={() => get__account__invoice__action(invoice.iv_id)}
            >
              <a href={"/admin/invoice/" + invoice.iv_id}>Xem chi tiết</a>
            </button>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    dispatch(get__account__invoices__action());
  }, [dispatch]);

  return (
    <>
      <Admin__header choose={0} />
      <div className="admin__container">
        <Admin__find__tool arr={[2, 3, 4, 5]} />
        <div className="admin__table">
          <div className="table__title">
            <div className="table__item">Mã HD</div>
            <div className="table__item">Người mua</div>
            <div className="table__item">Tổng Tiền</div>
            <div className="table__item">Ngày mua</div>
            <div className="table__item">Tình Trạng</div>
            <div className="table__item">Thao tác</div>
          </div>
          <div className="table__database__list">{render__invoices()}</div>
        </div>
      </div>
    </>
  );
}

export default Admin__statictis;

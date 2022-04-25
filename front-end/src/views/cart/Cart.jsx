import React from "react";
import Header from "./../../components/header/Header";
import "./Cart.scss";
function Cart() {
  return (
    <>
      <Header />
      <div class="cart__container">
        <div className="cart__content">
          <div className="cart__header">
            <label htmlFor="">
              <input type="checkbox" />
              <span>Chọn toàn bộ</span>
            </label>
            <button>Xóa khỏi giỏ hàng</button>
          </div>
          <div className="cart__body">
            <div className="cart__items">
              <div className="cart__item">
                <div className="cart__item__img">
                  <input type="checkbox" />
                  <img src="./images/695.jpg" alt="" />
                </div>
                <div className="cart__item__info">
                  <div className="cart__item__info__name">Đoán xem</div>
                  <div className="cart__item__price">123.457₫</div>
                  <div className="cart__item__quantity">
                    <button className="cart__item__quantity__minus">-</button>
                    <input
                      className="cart__item__quantity__number"
                      type="number"
                      defaultValue={1}
                    />
                    <button className="cart__item__quantity__plus">+</button>
                  </div>
                  <div className="cart__item__button">
                    <button>Xóa khỏi giỏ hàng</button>
                  </div>
                </div>
                {/* <div className="cart__item__total"></div> */}

                {/* <label htmlFor=""></label>
              <input type="checkbox" /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="cart__invoice">
          <div className="cart__invoice__address">
            <div className="cart__invoice__address__title">
              Địa chỉ giao hàng
            </div>
            <div>
              <textarea
                rows="5"
                cols="50"
                className="cart__invoice__address__content"
              />
            </div>
          </div>
          <hr />
          <div className="cart__invoice__describe">
            <div className="cart__invoice__describe__title">Mô tả đơn hàng</div>
            <div>
              <textarea
                rows="5"
                cols="50"
                className="cart__invoice__describe__content"
              />
            </div>
          </div>
          <hr />
          <div className="cart__invoice__total">
            <div className="cart__invoice__total__title">Tổng tiền hóa đơn</div>
            <div className="cart__invoice__total__content">
              <span>Tổng tiền:</span>
              <span>0₫</span>
            </div>
          </div>
          <hr />
          <div className="cart__invoice__button">
            <button>Thanh toán</button>
            {/* <button>Thanh toán Zalopay</button> */}
            <button>Tiếp tục mua hàng</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;

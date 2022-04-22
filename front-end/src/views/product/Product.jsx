import React from "react";
import Header from "./../../components/header/Header";
import "./Product.scss";
function Product() {
  return (
    <>
      <Header />
      <div className="product__container">
        <div className="product__content">
          <div className="product__image">
            <img src="./images/layout-login-signup.jpg" alt="" />
          </div>
          <div className="product__info">
            <div className="product__info__description">
              <div className="product__info__name">quần bồ</div>
              <div className="product__info__price">Giá: 123.457₫</div>
              <div className="product__info__number">Hàng Tồn Kho: 123</div>
            </div>

            <button>Thêm vào giỏ hàng</button>
          </div>
        </div>

        <hr />

        <div className="product__description">
          <div className="product__description__title">Mô Tả</div>
          <div className="product__description__text">Hàng tàu khựa</div>
        </div>
      </div>
    </>
  );
}

export default Product;

import React from "react";
import "./Product__card.scss";

function Product__card() {

    
//   console.log(
//     new Intl.NumberFormat("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     }).format(number)
//   );

  return (
    <>
      <div className="product__card">
        <div className="product__card__image">
          <img src="./images/layout-login-signup.jpg" alt="" />
        </div>
        <div className="product__card__info">
          <div className="product__card__info__name">Quần Bò Tàu Khựa</div>
          <div className="product__card__info__price">123.457₫</div>
        </div>
      </div>
    </>
  );
}

export default Product__card;

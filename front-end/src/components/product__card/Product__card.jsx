import React from "react";
import "./Product__card.scss";
import { priceFormatter } from "./../../utils/helpers";
import { useNavigate } from "react-router-dom";

function Product__card(props) {
  const { product } = props;
  const navigate = useNavigate();

  const productDetail = (p_id) => {
    navigate(`/product/${p_id}`);
    
  };

  return (
    <>
      <div
        className="product__card"
        onClick={() => productDetail(product.p_id)}
      >
        <div className="product__card__image">
          <img src={product.p_img} alt="" />
        </div>
        <div className="product__card__info">
          <div className="product__card__info__name">{product.p_name}</div>
          <div className="product__card__info__price">
            {priceFormatter(product.p_price)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product__card;

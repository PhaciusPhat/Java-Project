import React, { useEffect } from "react";
import Header from "./../../components/header/Header";
import "./Product.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { priceFormatter } from "../../utils/helpers";
import { get__product__action } from "./../../redux/actions/product__action";
import { add__cart } from "../../redux/actions/cart__action";
import swal from "sweetalert";
function Product() {
  const { product } = useSelector((state) => state.product__reducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const cart__storage = JSON.parse(localStorage.getItem("cart__storage"));
  if (cart__storage === null) {
    localStorage.setItem("cart__storage", JSON.stringify([]));
  }
  const add__cart__btn = (product) => {
    if (token) {
      if (product.p_isActive) {
        dispatch(add__cart({ p_id: product.p_id, number: 1 }));
      } else {
        swal("", "Sản phẩm không còn bán", "warning");
      }
    } else {
      const index = cart__storage.findIndex(
        (item) => item.p_id === product.p_id
      );
      if (index === -1) {
        product.number = 1;
        cart__storage.push(product);
      } else cart__storage[index].number++;
      localStorage.setItem("cart__storage", JSON.stringify(cart__storage));
      swal("", "Thêm sản phẩm vào giỏ hàng thành công", "success");
    }

    // swal("Đăng nhập trước khi thêm sản phẩm vào giỏ hàng", "", "warning");
  };

  useEffect(() => {
    dispatch(get__product__action(id));
  }, [dispatch, id]);

  const render__product = () => {
    if (product !== undefined) {
      return (
        <div className="product__container">
          <div className="product__content">
            <div className="product__image">
              <img src={product?.p_img} alt="" />
            </div>
            <div className="product__info">
              <div className="product__info__description">
                <div className="product__info__name">{product?.p_name}</div>
                <div className="product__info__price">
                  Giá: {priceFormatter(product?.p_price)}
                </div>
                <div className="product__info__number">
                  Hàng Tồn Kho: {product?.p_number}
                </div>
                <div className="product__info__number">
                  Loại Sản Phẩm: {product?.product_type?.pt_name}
                </div>
              </div>
              <button
                onClick={() => add__cart__btn(product)}
                disabled={product?.p_number < 1}
              >
                {product?.p_number < 1 ? "Hết Hàng" : "Thêm vào giỏ hàng"}
              </button>
            </div>
          </div>

          <hr />

          <div className="product__description">
            <div className="product__description__title">Mô Tả</div>
            <div className="product__description__text">{product?.p_des}</div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return (
    <>
      <Header />
      {render__product()}
    </>
  );
}

export default Product;

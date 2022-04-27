import React, { useEffect, useState } from "react";
import Header from "./../../components/header/Header";
import "./Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  delete__cart,
  get__carts__action,
} from "../../redux/actions/cart__action";
import { priceFormatter } from "./../../utils/helpers";
import swal from "sweetalert";
function Cart() {
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.cart__reducer);

  const items = [];
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const choose__item = (e) => {
    const checkbox = e.target;
    let temp = total;
    if (e.target.checked) {
      items.push(checkbox.getAttribute("data-key"));
      temp +=
        checkbox.parentElement.parentElement.children[1].children[1].getAttribute(
          "data-key"
        ) *
        checkbox.parentElement.parentElement.children[1].children[2].children[1]
          .value;
    } else {
      items.splice(items.indexOf(checkbox.getAttribute("data-key")), 1);
      temp -=
        checkbox.parentElement.parentElement.children[1].children[1].getAttribute(
          "data-key"
        ) *
        checkbox.parentElement.parentElement.children[1].children[2].children[1]
          .value;
    }
    setList(items);
    setTotal(temp);
  };

  const increase__decrease__number = (e) => {
    if (e.target.innerHTML === "+") {
      e.target.parentElement.children[1].value =
        Number(e.target.parentElement.children[1].value) + 1;
    } else {
      if (e.target.parentElement.children[1].value > 1) {
        e.target.parentElement.children[1].value =
          Number(e.target.parentElement.children[1].value) - 1;
      }
    }

    const target = e.target;

    if (
      target.parentElement.parentElement.parentElement.children[0].children[0]
        .checked
    ) {
      const checkboxes = document.getElementsByClassName("check");
      let temp = 0;
      for (let checkbox of checkboxes) {
        if (checkbox.checked) {
          items.push(checkbox.getAttribute("data-key"));
          temp +=
            checkbox.parentElement.parentElement.children[1].children[1].getAttribute(
              "data-key"
            ) *
            checkbox.parentElement.parentElement.children[1].children[2]
              .children[1].value;
        } else {
          items.splice(items.indexOf(checkbox.getAttribute("data-key")), 1);
        }
      }
      setList(items);
      setTotal(temp);
    }
  };

  const change__number = (e) => {
    const target = e.target;
    if (
      target.parentElement.parentElement.parentElement.children[0].children[0]
        .checked
    ) {
      const checkboxes = document.getElementsByClassName("check");
      let temp = 0;
      for (let checkbox of checkboxes) {
        if (checkbox.checked) {
          items.push(checkbox.getAttribute("data-key"));
          temp +=
            checkbox.parentElement.parentElement.children[1].children[1].getAttribute(
              "data-key"
            ) *
            checkbox.parentElement.parentElement.children[1].children[2]
              .children[1].value;
        } else {
          items.splice(items.indexOf(checkbox.getAttribute("data-key")), 1);
        }
      }

      setList(items);
      setTotal(temp);
    }
  };

  const render__carts = () => {
    return carts?.map((item) => {
      return (
        <div className="cart__item" key={item.cart_product.p_id}>
          <div className="cart__item__img">
            <input
              type="checkbox"
              className="check"
              data-key={item.cart_product.p_id}
              onClick={choose__item}
            />
            <img src={item.cart_product.p_img} alt="" />
          </div>
          <div className="cart__item__info">
            <div className="cart__item__info__name">
              {item.cart_product.p_name}
            </div>

            <div
              className="cart__item__price"
              data-key={item.cart_product.p_price}
              id={`price__of__product__${item.cart_product.p_id}`}
            >
              {priceFormatter(item.cart_product.p_price)}
            </div>

            <div className="cart__item__quantity">
              <button
                className="cart__item__quantity__minus"
                onClick={increase__decrease__number}
              >
                -
              </button>
              <input
                className="cart__item__quantity__number"
                type="number"
                id={`quantity__of__product__${item.cart_product.p_id}`}
                onChange={change__number}
                defaultValue={item.cart_number}
              />
              <button
                className="cart__item__quantity__plus"
                onClick={increase__decrease__number}
              >
                +
              </button>
            </div>

            <div className="cart__item__button">
              <button onClick={() => delete__item(item.cart_product.p_id)}>
                Xóa khỏi giỏ hàng
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const choose__all = (e) => {
    const checkboxes = document.getElementsByClassName("check");
    let temp = 0;
    for (let checkbox of checkboxes) {
      checkbox.checked = e.target.checked;
      if (e.target.checked) {
        items.push(checkbox.getAttribute("data-key"));
        temp +=
          checkbox.parentElement.parentElement.children[1].children[1].getAttribute(
            "data-key"
          ) *
          checkbox.parentElement.parentElement.children[1].children[2]
            .children[1].value;
      } else {
        items.splice(items.indexOf(checkbox.getAttribute("data-key")), 1);
      }
    }

    setList(items);
    setTotal(temp);
  };

  const delete__all = () => {
    if (list.length === 0) {
      swal("", "Vui lòng chọn sản phẩm", "warning");
    } else {
      dispatch(delete__cart(list));
    }
  };

  const delete__item = (p_id) => {
    const arr = [p_id];
    dispatch(delete__cart(arr));
  };

  useEffect(() => {
    dispatch(get__carts__action());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="cart__container">
        <div className="cart__content">
          <div className="cart__header">
            <label htmlFor="">
              <input type="checkbox" onClick={choose__all} />
              <span>Chọn toàn bộ</span>
            </label>
            <button onClick={delete__all}>Xóa khỏi giỏ hàng</button>
          </div>
          <div className="cart__body">
            <div className="cart__items">
              <div className="cart__item">
                <div className="cart__item__img">Ảnh</div>
                <div className="cart__item__info">
                  <div className="cart__item__info__name">Tên</div>
                  <div className="cart__item__price">Giá</div>
                  <div className="cart__item__quantity">Số Lượng mua</div>
                  <div className="cart__item__button">Xóa</div>
                </div>
              </div>
              {render__carts()}
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
              <span>{priceFormatter(total)}</span>
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

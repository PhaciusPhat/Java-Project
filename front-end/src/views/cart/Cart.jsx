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
import { Link } from "react-router-dom";
import { create__invoice__action } from "../../redux/actions/invoice__action";
import { regexAddress } from "../../utils/regex";
import Loader from "./../../components/loader/Loader";
function Cart() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { carts } = useSelector((state) => state.cart__reducer);
  const { isLoading } = useSelector((state) => state.common__reducer);
  let items = [];
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const [invoice, setInvoice] = useState({
    iv_address: "",
    iv_describe: "",
  });

  const choose__item = (e) => {
    const checkbox = e.target;
    let temp = total;
    items = list;
    if (e.target.checked) {
      items.push(checkbox.getAttribute("data-key"));
      temp +=
        checkbox.parentElement.parentElement.children[1].children[1].getAttribute(
          "data-key"
        ) *
        checkbox.parentElement.parentElement.children[1].children[2].children[1]
          .value;
    } else {
      checkbox.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[0].checked = false;
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
                min="1"
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
                X??a kh???i gi??? h??ng
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const render__local__cart = () => {
    const cart__storage = JSON.parse(localStorage.getItem("cart__storage"));
    return cart__storage.map((item) => {
      return (
        <div className="cart__item" key={item.p_id}>
          <div className="cart__item__img">
            <input
              type="checkbox"
              className="check"
              data-key={item.p_id}
              onClick={choose__item}
            />
            <img src={item.p_img} alt="" />
          </div>
          <div className="cart__item__info">
            <div className="cart__item__info__name">{item.p_name}</div>

            <div
              className="cart__item__price"
              data-key={item.p_price}
              id={`price__of__product__${item.p_id}`}
            >
              {priceFormatter(item.p_price)}
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
                id={`quantity__of__product__${item.p_id}`}
                onChange={change__number}
                defaultValue={item.number}
                min="1"
              />
              <button
                className="cart__item__quantity__plus"
                onClick={increase__decrease__number}
              >
                +
              </button>
            </div>

            <div className="cart__item__button">
              <button onClick={() => delete__item(item.p_id)}>
                X??a kh???i gi??? h??ng
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
      swal("", "Vui l??ng ch???n s???n ph???m", "warning");
    } else {
      if (token) {
        dispatch(delete__cart(list));
      } else {
        localStorage.removeItem("cart__storage");
        window.location.reload();
      }
    }
  };

  const delete__item = (p_id) => {
    if (token) {
      const arr = [p_id];
      dispatch(delete__cart(arr));
    } else {
      const cart__storage = JSON.parse(localStorage.getItem("cart__storage"));
      const new__cart__storage = cart__storage.filter(
        (item) => item.p_id !== p_id
      );
      localStorage.setItem("cart__storage", JSON.stringify(new__cart__storage));
      window.location.reload();
    }
  };

  const submit__invoices = () => {
    if (list.length === 0) {
      swal("", "Vui l??ng ch???n s???n ph???m", "warning");
    } else {
      const cartRequestList = [];
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (
          document.getElementById(`quantity__of__product__${element}`).value < 1
        ) {
          swal("", "Vui l??ng nh???p s??? l?????ng ????ng ?????nh d???ng", "warning");
          return;
        }
        cartRequestList.push({
          p_id: element,
          number: document.getElementById(`quantity__of__product__${element}`)
            .value,
        });
      }
      invoice.cartRequestList = cartRequestList;
      if (invoice.iv_address === "") {
        swal("", "Vui l??ng nh???p ?????a ch??? ", "warning");
        return;
      }
      if (invoice.iv_address.match(regexAddress) === null) {
        swal("", "Vui l??ng nh???p ?????a ch??? ????ng ?????nh d???ng", "warning");
        return;
      }
      dispatch(create__invoice__action(invoice, token === null));
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(get__carts__action());
    }
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  return (
    <>
      {isLoading && <Loader />}
      <Header />
      <div className="cart__container">
        <div className="cart__content">
          <div className="cart__header">
            <label htmlFor="">
              <input type="checkbox" onClick={choose__all} />
              <span>Ch???n to??n b???</span>
            </label>
            <button onClick={delete__all}>X??a kh???i gi??? h??ng</button>
          </div>
          <div className="cart__body">
            <div className="cart__items">
              <div className="cart__item">
                <div className="cart__item__img">???nh</div>
                <div className="cart__item__info">
                  <div className="cart__item__info__name">T??n</div>
                  <div className="cart__item__price">Gi??</div>
                  <div className="cart__item__quantity">S??? L?????ng mua</div>
                  <div className="cart__item__button">X??a</div>
                </div>
              </div>
              {token ? render__carts() : render__local__cart()}
            </div>
          </div>
        </div>
        <div className="cart__invoice">
          <div className="cart__invoice__address">
            <div className="cart__invoice__address__title">
              ?????a ch??? giao h??ng
            </div>
            <div>
              <textarea
                onChange={handleChange}
                rows="5"
                cols="50"
                className="cart__invoice__address__content"
                name="iv_address"
              />
            </div>
          </div>
          <hr />
          <div className="cart__invoice__describe">
            <div className="cart__invoice__describe__title">M?? t??? ????n h??ng</div>
            <div>
              <textarea
                onChange={handleChange}
                rows="5"
                cols="50"
                className="cart__invoice__describe__content"
                name="iv_describe"
              />
            </div>
          </div>
          <hr />
          <div className="cart__invoice__total">
            <div className="cart__invoice__total__title">T???ng ti???n h??a ????n</div>
            <div className="cart__invoice__total__content">
              <span>T???ng ti???n:</span>
              <span>{priceFormatter(total)}</span>
            </div>
          </div>
          <hr />
          <div className="cart__invoice__button">
            <button onClick={submit__invoices}>Thanh to??n (COD)</button>
            {/* <button>Thanh to??n Zalopay</button> */}
            <button>
              <Link to="/">Ti????p tu??c mua ha??ng</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;

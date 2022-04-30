import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import "./Home.scss";
import Product__card from "./../../components/product__card/Product__card";
import { useDispatch, useSelector } from "react-redux";
import {
  get__products__action,
  get__pt__products__action,
} from "./../../redux/actions/product__action";
import { get__product__types__action } from "../../redux/actions/product__type__action";

function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product__reducer);
  const { product__types } = useSelector(
    (state) => state.product__type__reducer
  );

  useEffect(() => {
    dispatch(get__products__action());
    dispatch(get__product__types__action());
  }, [dispatch]);

  const renderProductList = () => {
    return products?.map((product) => {
      return <Product__card key={product.p_id} product={product} />;
    });
  };

  const renderProductTypeList = () => {
    return product__types?.map((product__type) => {
      return (
        <li
          className="navigate_item"
          onClick={chooseProductType}
          key={product__type.pt_id}
          data-key={product__type.pt_id}
        >
          {product__type.pt_name}
        </li>
      );
    });
  };

  const chooseProductType = (event) => {
    const pt_id = event.target.getAttribute("data-key");
    const elements = document.getElementsByClassName(event.target.className);
    for (let element of elements) {
      element.classList.remove("active");
    }
    event.target.classList.add("active");
    if (pt_id !== -1) {
      dispatch(get__pt__products__action(pt_id));
    }
    if (Number(pt_id) === -1) {
      dispatch(get__products__action());
    }
  };

  return (
    <>
      <Header />
      <div className="home__carousel">
        <img src="./images/695.jpg" alt="" srcSet="" />
      </div>
      <div className="home__container">
        <div className="home__container__navigate__list">
          <ul>
            <li
              data-key={-1}
              onClick={chooseProductType}
              className="active navigate_item"
            >
              Tất Cả SP
            </li>
            {renderProductTypeList()}
          </ul>
        </div>
        <div className="home__container__product__list">
          {renderProductList()}
        </div>
      </div>
    </>
  );
}

export default Home;

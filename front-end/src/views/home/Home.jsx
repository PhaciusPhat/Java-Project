import React from "react";
import Header from "../../components/header/Header";
import "./Home.scss";
import Product__card from './../../components/product__card/Product__card';

function Home() {
  // const renderProductList = () => {

  // }

  return (
    <>
      <Header />
      <div className="home__carousel">
        <img src="./images/695.jpg" alt="" srcset="" />
      </div>
      <div className="home__container">
        <div className="home__container__navigate__list">
          <ul>
            <li className="active">Quần</li>
            <li>Áo</li>
            <li>Áo</li>
            <li>Áo</li>
          </ul>
        </div>
        <div className="home__container__product__list">
          <Product__card />
        </div>
      </div>
    </>
  );
}

export default Home;

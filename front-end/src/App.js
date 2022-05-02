import Home from "./views/home/Home";
import Login from "./views/login__sign-up/Login";
import Sign__up from "./views/login__sign-up/Sign__up";
import Product from "./views/product/Product";
import Cart from "./views/cart/Cart";
import Change__pass from "./views/change-pass/Change__pass";
import User from "./views/user/User";
import Admin from "./views/admin/Admin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected__route from "./auth/routes/Protected__route";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get__info__action } from "./redux/actions/user__action";
import Admin__product from "./components/admin__product/Admin__product";
import Admin__statictis from "./components/admin__statictis/Admin__statictis";
import Admin__product__type from "./components/admin__product__type/Admin__product__type";
import Admin__account from "./components/admin__account/Admin__account";
import Product__type__form from "./components/product__type__form/Product__type__form";
import Product__form from "./components/product__form/Product__form";
import User__form from "./components/user__form/User__form";
import Invoice__form from "./components/invoice__form/Invoice__form";
import {
  get__account__invoice__action,
  get__user__invoice__action,
} from "./redux/actions/invoice__action";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get__info__action());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Sign__up />} />
          <Route path="/product/:id" element={<Product />} />

          <Route element={<Protected__route />}>
            {/* thanh toán */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/change-pass" element={<Change__pass />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<Admin__statictis />} />
            <Route path="/admin__product" element={<Admin__product />} />
            <Route
              path="/admin__product__type"
              element={<Admin__product__type />}
            />
            <Route path="/admin__account" element={<Admin__account />} />
            {/*  */}
            <Route
              path="/admin__product__type/form"
              element={<Product__type__form />}
            ></Route>
            <Route
              path="/admin__product__type/form/:id"
              element={<Product__type__form />}
            ></Route>
            {/*  */}
            <Route
              path="/admin__product/form"
              element={<Product__form />}
            ></Route>
            <Route
              path="/admin__product/form/:id"
              element={<Product__form />}
            ></Route>
            {/*  */}
            <Route
              path="/admin__account/form/:id"
              element={<User__form />}
            ></Route>
            {/*  */}
            <Route
              path="/user/invoice/:id"
              element={
                <Invoice__form get__invoice={get__user__invoice__action} back__link={"/user"}/>
              }
            ></Route>
            <Route
              path="/admin/invoice/:id"
              element={
                <Invoice__form get__invoice={get__account__invoice__action} back__link={"/admin"}/>
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

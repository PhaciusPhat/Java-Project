import React from "react";
import "./Admin.scss";
import Admin__header from "./../../components/admin__header/Admin__header";
import Admin__statictis from "./../../components/admin__statictis/Admin__statictis";
import Admin__account from "./../../components/admin__account/Admin__account";
import Admin__product__type from "../../components/admin__product__type/Admin__product__type";
import Admin__product from './../../components/admin__product/Admin__product';
function Admin() {
  return (
    <>
      <Admin__header />
      {/* <Admin__account /> */}
      {/* <Admin__statictis/> */}
      {/* <Admin__product__type/> */}
      <Admin__product/>
    </>
  );
}

export default Admin;

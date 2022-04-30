import React, { useEffect, useState } from "react";
import Admin__header from "../admin__header/Admin__header";
import "../../views/admin/Admin__form.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { delete__user__action } from "./../../redux/actions/user__action";
import {
  get__user__info__action,
  update__user__action,
} from "../../redux/actions/user__action";
function User__form() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user__info } = useSelector((state) => state.user__reducer);
  const renderRoles = () => {
    const roles = ["CLIENT", "ADMIN", "SUPER_ADMIN"];
    return roles?.map((role, roles) => {
      return (
        <option key={roles} value={role}>
          {role}
        </option>
      );
    });
  };

  const choose = (e) => {
    user__info.user_role = e.target.value;
  };

  const render = () => {
    if (user__info?.user_id) {
      return (
        <select defaultValue={user__info.user_role} onChange={choose}>
          {renderRoles()}
        </select>
      );
    } else {
      return <>Loading...</>;
    }
  };

  useEffect(() => {
    dispatch(get__user__info__action(id));
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(update__user__action(user__info, id));
  };

  return (
    <>
      <Admin__header choose={1} />
      <div className="form__page">
        <form className="form__container" onSubmit={submitForm}>
          <div className="form__input__group">
            <label htmlFor="">Tài Khoản</label>
            <input
              readOnly
              type="text"
              name=""
              defaultValue={user__info.user_username}
            />
          </div>

          <div className="form__input__group">
            <label htmlFor="">Họ Tên</label>
            <input
              readOnly
              type="text"
              name=""
              defaultValue={user__info.user_name}
            />
          </div>
          <div className="form__input__group">
            <label htmlFor="">Email</label>
            <input
              readOnly
              type="text"
              name=""
              defaultValue={user__info.user_email}
            />
          </div>
          <div className="form__input__group">
            <label htmlFor="">Số Điện Thoại</label>
            <input
              readOnly
              type="number"
              name=""
              defaultValue={user__info.user_phone}
            />
          </div>
          <div className="form__input__group">
            <label htmlFor="p_price">Chức Vụ</label>
            {render()}
          </div>
          <div className="form__input__button">
            <button className="btn btn-primary" type="submit">
              Cập nhật
            </button>
            <button
              onClick={() => {
                dispatch(delete__user__action(id));
              }}
            >
              Xóa
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default User__form;

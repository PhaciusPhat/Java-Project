import React, { useEffect } from "react";
import Admin__find__tool from "./../admin__find__tool/Admin__find__tool";
import Admin__header from "../admin__header/Admin__header";
import "../../views/admin/Admin.scss";
import { useDispatch, useSelector } from "react-redux";
import { find__user__action, get__users__action } from "../../redux/actions/user__action";
function Admin__account() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user__reducer);

  const renderUsers = () => {
    return users?.map((user) => {
      return (
        <div className="table__database" key={user.user_id}>
          <div className="table__item">{user.user_username}</div>
          <div className="table__item">{user.user_name}</div>
          <div className="table__item">{user.user_email}</div>
          <div className="table__item">{user.user_phone}</div>
          <div className="table__item">{user.user_role}</div>
          <div className="table__item">
            <button>
              <a href={"/admin__account/form/" + user.user_id}>Xem chi tiết</a>
            </button>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    dispatch(get__users__action());
  }, []);

  return (
    <>
      <Admin__header choose={1} />
      <div className="admin__container">
        <Admin__find__tool arr={[0]} findFunc={find__user__action}/>
        <div className="admin__table">
          <div className="table__title">
            <div className="table__item">Tài khoản</div>
            <div className="table__item">Họ và Tên</div>
            <div className="table__item">Email</div>
            <div className="table__item">Số điện thoại</div>
            <div className="table__item">Chức vụ</div>
            <div className="table__item">Thao tác</div>
          </div>
          <div className="table__database__list">{renderUsers()}</div>
        </div>
      </div>
    </>
  );
}

export default Admin__account;

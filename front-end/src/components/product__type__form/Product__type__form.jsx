import React, { useEffect, useState } from "react";
import Admin__header from "./../admin__header/Admin__header";
import "../../views/admin/Admin__form.scss";
import {
  add__product__type__action,
  delete__product__type__action,
  get__product__type__action,
} from "../../redux/actions/product__type__action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function Product__type__form(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  let { product__type } = useSelector((state) => state.product__type__reducer);
  const handleChange = (event) => {
    const { name, value } = event.target;
    product__type[name] = value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const add__product__type = (isAdd) => {
    dispatch(add__product__type__action(product__type, id, isAdd));
  };

  useEffect(() => {
    dispatch(get__product__type__action(id));
  }, [dispatch, id]);

  const renderProductType = () => {
    if (product__type) {
      return (
        <form className="form__container" onSubmit={handleSubmit}>
          <div className="form__input__group">
            <label htmlFor="pt_name">Loại Sản Phẩm</label>
            <input
              type="text"
              name="pt_name"
              onChange={handleChange}
              defaultValue={product__type?.pt_name}
            />
          </div>

          <div className="form__input__button">{renderButton()}</div>
        </form>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  const renderButton = () => {
    if (id) {
      return (
        <div className="form__input__button">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => add__product__type(false)}
          >
            Cập nhật
          </button>
          <button
            onClick={() => {
              dispatch(delete__product__type__action(id));
            }}
          >
            Xóa
          </button>
        </div>
      );
    } else {
      return (
        <div className="form__input__button">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => add__product__type(true)}
          >
            Thêm
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <Admin__header choose={3} />
      <div className="form__page">{renderProductType()}</div>
    </>
  );
}

export default Product__type__form;

import React, { useEffect, useState } from "react";
import Admin__header from "../admin__header/Admin__header";
import "../../views/admin/Admin__form.scss";
import { useParams } from "react-router-dom";
import {
  add__product__action,
  delete__product__action,
  get__product__action,
} from "../../redux/actions/product__action";
import { useDispatch, useSelector } from "react-redux";
import { get__product__types__action } from "../../redux/actions/product__type__action";
import swal from "sweetalert";
import { regexName } from "../../utils/regex";
function Product__form() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product } = useSelector((state) => state.product__reducer);
  const { product__types } = useSelector(
    (state) => state.product__type__reducer
  );

  const renderProductTypes = () => {
    return product__types?.map((product__type) => {
      return (
        <option key={product__type.pt_id} value={product__type.pt_id}>
          {product__type.pt_name}
        </option>
      );
    });
  };

  const renderButton = () => {
    if (id) {
      return (
        <div className="form__input__button">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => add_product(false)}
          >
            Cập nhật
          </button>
          <button
            onClick={() => {
              dispatch(delete__product__action(id));
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
            onClick={() => add_product(true)}
          >
            Thêm
          </button>
        </div>
      );
    }
  };

  const changeImgFile = (e) => {
    const target = e.target;
    target.parentElement.children[1].height = 200;
    target.parentElement.children[1].src = URL.createObjectURL(
      e.target.files[0]
    );
  };

  const changeInput = (e) => {
    const target = e.target;
    if (target.name === "p_img") {
      changeImgFile(e);
      product[target.name] = target.files[0];
    } else {
      product[target.name] = target.value;
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  const validate = (isAdd) => {
    if (
      product.p_name === "" ||
      product.p_price === "" ||
      product.p_des === "" ||
      product.p_number === "" ||
      product.p_name === undefined ||
      product.p_price === undefined ||
      product.p_des === undefined ||
      product.p_number === undefined
    ) {
      swal("", "Vui lòng nhập đầy đủ thông tin", "error");
      return false;
    }
    if (isAdd && product.p_img === undefined) {
      swal("", "Vui lòng chọn ảnh", "error");
      return false;
    }

    if (product.p_name.match(regexName) === null) {
      swal("", "Tên sản phẩm không hợp lệ", "error");
      return false;
    }
    if (product.p_des.match(regexName) === null) {
      swal("", "Mô tả sản phẩm không hợp lệ", "error");
      return false;
    }
    if (product.p_number < 1) {
      swal("", "Số lượng sản phẩm không hợp lệ", "error");
      return false;
    }
    if (product.p_price < 1) {
      swal("", "Giá sản phẩm không hợp lệ", "error");
      return false;
    }
    return true;
  };

  const add_product = (isAdd) => {
    if (product.pt_id === undefined) {
      product.pt_id = product__types[0].pt_id;
    } 

    let fd = new FormData();
    for (const key in product) {
      if (key === "p_img") {
        if (product[key]?.name) {
          fd.append(key, product[key], product[key].name);
        } else {
          fd.append(key, new File([], ""));
        }
      } else {
        fd.append(key, product[key]);
      }
    }
    if (validate(isAdd)) {
      dispatch(add__product__action(fd, id, isAdd));
    }
    //
  };

  useEffect(() => {
    dispatch(get__product__types__action());
    if (id) {
      dispatch(get__product__action(id));
    }
  }, [dispatch, id]);

  const selectProductType = (e) => {
    product["pt_id"] = e.target.value;
  };

  const renderProductTypeOfProduct = () => {
    if (product?.product_type?.pt_id) {
      return (
        <select
          name=""
          id=""
          onChange={selectProductType}
          defaultValue={product?.product_type?.pt_id}
        >
          {renderProductTypes()}
        </select>
      );
    } else {
      return <>Loading...</>;
    }
  };

  const renderProductType = () => {
    if (id) {
      return (
        <>
          <label htmlFor="pt_id">Loại Sản Phẩm</label>
          {renderProductTypeOfProduct()}
        </>
      );
    } else {
      return (
        <>
          <label htmlFor="pt_id">Loại Sản Phẩm</label>
          <select name="" id="" onChange={selectProductType}>
            {renderProductTypes()}
          </select>
        </>
      );
    }
  };

  return (
    <>
      <Admin__header choose={2} />
      <div className="form__page">
        <form className="form__container" onSubmit={submitForm}>
          <div className="form__input__group">
            <label htmlFor="p_name">Tên Sản Phẩm</label>
            <input
              onChange={changeInput}
              type="text"
              name="p_name"
              defaultValue={product.p_name}
            />
          </div>
          <div className="form__input__group">{renderProductType()}</div>
          <div className="form__input__group">
            <label htmlFor="p_des">Mô Sản Phẩm</label>
            <textarea
              rows={10}
              onChange={changeInput}
              type="text"
              name="p_des"
              defaultValue={product.p_des}
            />
          </div>
          <div className="form__input__group">
            <label htmlFor="p_number">Số Lượng</label>
            <input
              onChange={changeInput}
              type="number"
              name="p_number"
              defaultValue={product.p_number}
            />
          </div>
          <div className="form__input__group">
            <label htmlFor="p_price">Giá</label>
            <input
              onChange={changeInput}
              type="number"
              name="p_price"
              defaultValue={product.p_price}
            />
          </div>
          <div className="form__input__group">
            <label htmlFor="p_img">Ảnh</label>
            <img
              src={product.p_img}
              alt=""
              sizes="75"
              height={product.p_img ? 200 : 0}
            />
            <input onChange={changeInput} type="file" name="p_img" />
          </div>
          <div className="form__input__button">{renderButton()}</div>
        </form>
      </div>
    </>
  );
}

export default Product__form;

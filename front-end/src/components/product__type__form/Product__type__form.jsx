import React from "react";
import Admin__header from "./../admin__header/Admin__header";

function Product__type__form() {
  return (
    <>
      <Admin__header choose={3} />
      <form className="form__container">
        <div className="form__input__group">
          <label htmlFor="">Loại Sản Phẩm</label>
          <input type="text" />
        </div>
        <div className="form__input__group">
            <button>Thêm</button>
            <button>Cập Nhật</button>
            <button>Xóa</button>
        </div>
      </form>
    </>
  );
}

export default Product__type__form;

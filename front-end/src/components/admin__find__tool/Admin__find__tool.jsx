import React from "react";
import { AiOutlineMinus, AiOutlineSearch } from "react-icons/ai";
function Admin__find__tool() {
  return (
    <>
      <div className="find__tool">
        <div className="find__tool__input">
          <label htmlFor="">Tìm kiếm theo tên</label>
          <input type="text" />
        </div>
        <div className="find__tool__input">
          <label htmlFor="">Tìm kiếm theo ngày</label>
          <div className="find__date">
            <input type="date" />
            <AiOutlineMinus />
            <input type="date" />
          </div>
        </div>
        <div className="find__tool__input">
          <label htmlFor="">
            <AiOutlineMinus />
          </label>
          <button>
            <AiOutlineSearch />
          </button>
        </div>
      </div>
    </>
  );
}

export default Admin__find__tool;

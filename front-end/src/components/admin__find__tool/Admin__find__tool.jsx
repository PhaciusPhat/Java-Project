import React, { useEffect } from "react";
import { AiOutlineMinus, AiOutlineSearch } from "react-icons/ai";
function Admin__find__tool(props) {
  const { arr } = props;

  const renderTool = () => {
    const items = document.getElementsByClassName("find__tool__input");
    for (let item of items) {
      item.style.display = "none";
    }
    for (let index = 0; index < arr.length; index++) {
      items[index].style.display = "flex";
    }
    items[items.length - 1].style.display = "flex";
  };

  useEffect(() => {
    renderTool();

  })

  return (
    <>
      <div className="find__tool">
        <div className="find__tool__input">
          <label htmlFor="">Tìm kiếm theo tên</label>
          <input type="text" />
        </div>
        <div className="find__tool__input">
          <label htmlFor="">Tìm kiếm theo loại</label>
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
          <label htmlFor="" style={{ color: "transparent" }}>
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

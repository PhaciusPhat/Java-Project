import React, { useEffect } from "react";
import { AiOutlineMinus, AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  get__products__action,
  get__pt__products__action,
} from "../../redux/actions/product__action";
import { get__product__types__action } from "../../redux/actions/product__type__action";
function Admin__find__tool(props) {
  const dispatch = useDispatch();
  const { arr } = props;
  const { findFunc } = props;
  const { product__types } = useSelector(
    (state) => state.product__type__reducer
  );
  const renderTool = () => {
    const items = document.getElementsByClassName("find__tool__input");
    for (let item of items) {
      item.style.display = "none";
    }
    for (let index = 0; index < arr.length; index++) {
      items[arr[index]].style.display = "flex";
    }
  };

  const choose = (e) => {
    const value = e.target.value;
    const target = e.target;
    // console.log(target.parentElement.parentElement.children[0])
    target.parentElement.parentElement.children[0].children[1].value = ""
    if (Number(value) === -1) {
      dispatch(get__products__action());
    } else {
      dispatch(get__pt__products__action(value));
    }
  };

  const renderSelection = () => {
    return product__types?.map((product__type) => {
      return (
        <option key={product__type.pt_id} value={product__type.pt_id}>
          {product__type.pt_name}
        </option>
      );
    });
  };

  useEffect(() => {
    renderTool();
    dispatch(get__product__types__action());
  }, [dispatch]);

  const handleChange = (e) => {
    const target = e.target;
    target.parentElement.parentElement.children[1].children[1].value = -1;
    dispatch(findFunc(e.target.value));
  };

  return (
    <>
      <div className="find__tool">
        <div className="find__tool__input">
          <label htmlFor="">Tìm kiếm theo tên</label>
          <input type="text" onChange={handleChange} />
        </div>
        <div className="find__tool__input">
          <label htmlFor="">Tìm kiếm theo loại</label>
          <select name="" id="" onChange={choose}>
            <option value={-1}>Tất cả</option>
            {renderSelection()}
          </select>
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

import React, { useEffect, useState } from "react";
import {
  AiOutlineMinus,
  AiOutlineSearch,
  AiOutlineReload,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { find__invoices__action } from "../../redux/actions/invoice__action";
import {
  get__products__action,
  get__pt__products__action,
} from "../../redux/actions/product__action";
import { get__product__types__action } from "../../redux/actions/product__type__action";
import { dateFormatForInput } from "../../utils/helpers";

function Admin__find__tool(props) {
  const dispatch = useDispatch();
  const { arr } = props;
  const { findFunc } = props;
  const { product__types } = useSelector(
    (state) => state.product__type__reducer
  );
  const [data, setData] = useState({
    start_date: new Date(dateFormatForInput(0)).getTime(),
    end_date: new Date(dateFormatForInput(1)).getTime(),
    user_name: "",
  });
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
    target.parentElement.parentElement.children[0].children[1].value = "";
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
    dispatch(
      findFunc(
        e.target.value,
        target.parentElement.parentElement.children[1].children[1].value
      )
    );
  };

  const handleChangeInvoice = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChange__date = (e) => {
    setData({ ...data, [e.target.name]: new Date(e.target.value).getTime() });
  };
  return (
    <>
      <div className="find__tool">
        <div className="find__tool__input">
          <label htmlFor="">Tìm kiếm theo tên</label>
          <input type="text" onChange={handleChange} id="user_name" />
        </div>
        <div className="find__tool__input">
          <label htmlFor="">Tìm kiếm theo loại</label>
          <select name="" id="" onChange={choose}>
            <option value={-1}>Tất cả</option>
            {renderSelection()}
          </select>
        </div>
        <div className="find__tool__input">
          <label htmlFor="">Tìm kiếm theo tên</label>
          <input type="text" name="user_name" onChange={handleChangeInvoice} />
        </div>
        <div className="find__tool__input">
          <label htmlFor="">Tìm kiếm theo ngày</label>
          <div className="find__date">
            {/* dateFormat(new Date()) */}
            <input
              type="date"
              defaultValue={dateFormatForInput(0)}
              name="start_date"
              onChange={handleChange__date}
            />
            <AiOutlineMinus />
            <input
              type="date"
              defaultValue={dateFormatForInput(1)}
              name="end_date"
              onChange={handleChange__date}
            />
          </div>
        </div>
        <div className="find__tool__input">
          <label htmlFor="" style={{ color: "transparent" }}>
            <AiOutlineMinus />
          </label>
          <button
            onClick={() => {
              dispatch(find__invoices__action(data));
            }}
          >
            <AiOutlineSearch />
          </button>
        </div>
        <div className="find__tool__input">
          <label htmlFor="" style={{ color: "transparent" }}>
            <AiOutlineMinus />
          </label>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            <AiOutlineReload />
          </button>
        </div>
      </div>
    </>
  );
}

export default Admin__find__tool;

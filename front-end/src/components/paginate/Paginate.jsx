import React from "react";
import "./Paginate.scss";
import {
  AiOutlineMinusCircle,
  AiFillPlusCircle,
  AiOutlineSearch,
} from "react-icons/ai";
function Paginate() {
  return (
    <>
      <div className="table__paginate">
        <button>
          <AiOutlineMinusCircle />
        </button>
        <input type="number" defaultValue={1} />
        <input type="number" defaultValue={2} readOnly />
        <button>
          <AiFillPlusCircle />
        </button>
        <button><AiOutlineSearch/></button>
      </div>
    </>
  );
}

export default Paginate;

import axios from "axios";
import swal from "sweetalert";
import { GET__PRODUCTTYPES } from "../constants/redux__const";

export const get__product__types__action = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:2222/api/product-type/");

      dispatch({
        type: GET__PRODUCTTYPES,
        payload: res.data,
      });
    } catch (error) {
      swal("", "Lỗi kết nối", "error");
    }
  };
};

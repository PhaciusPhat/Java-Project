import { GET__INVOICES, GET__USER__INVOICES } from "../constants/redux__const";
import { GET__USER__INVOICE, GET__INVOICE } from "./../constants/redux__const";

const initialState = {
  user__invoices: [],
  user__invoice: [],
  invoices: [],
};

const invoice__reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET__USER__INVOICES:
      state.user__invoices = payload;
      return { ...state };
    case GET__USER__INVOICE:
      state.user__invoice = payload;
      return { ...state };
    case GET__INVOICES:
      state.invoices = payload;
      return { ...state };
    default:
      return state;
  }
};

export default invoice__reducer;

import { GET__PRODUCT, GET__PRODUCTS } from "./../constants/redux__const";

const initialState = {
  products: [],
  product: {}
};

const product__reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET__PRODUCTS:
      state.products = payload;
      return { ...state };
    case GET__PRODUCT:
      state.product = payload;
      return { ...state };
    default:
      return state;
  }
};

export default product__reducer;

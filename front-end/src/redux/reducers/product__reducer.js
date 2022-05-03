import { FIND__PRODUCT, GET__PRODUCT, GET__PRODUCTS } from "./../constants/redux__const";

const initialState = {
  products: [],
  product: {}, 
  header__find__product: [],
};

const product__reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET__PRODUCTS:
      state.products = payload;
      return { ...state };
    case GET__PRODUCT:
      state.product = payload;
      return { ...state };
    case FIND__PRODUCT: 
      state.header__find__product = payload;
      return { ...state };
    default:
      return state;
  }
};

export default product__reducer;

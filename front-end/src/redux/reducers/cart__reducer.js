import { GET__CART } from "./../constants/redux__const";

const initialState = {
  carts: [],
};

 const cart__reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET__CART:
      state.carts = payload;
      return { ...state };

    default:
      return state;
  }
};

export default cart__reducer;

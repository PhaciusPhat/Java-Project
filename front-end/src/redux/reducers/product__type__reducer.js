import { GET__PRODUCTTYPES } from "./../constants/redux__const";
const initialState = {
  product__types: [],
};

const product__type__reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET__PRODUCTTYPES:
      state.product__types = payload;
      return { ...state };

    default:
      return state;
  }
};

export default product__type__reducer;

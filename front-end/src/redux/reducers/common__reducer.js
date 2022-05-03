import { START__LOADING, STOP__LOADING } from "../constants/redux__const";

const initialState = {
  isLoading: false,
};

const common__reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case START__LOADING:
      console.log(123)
      state.isLoading = true;
      return { ...state };
    case STOP__LOADING:
      state.isLoading = false;
      return { ...state };

    default:
      return state;
  }
};

export default common__reducer;
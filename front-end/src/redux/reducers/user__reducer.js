import { GET__INFO, LOGOUT } from "./../constants/redux__const";

const initialState = {
  user: {},
};

const user__reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET__INFO:
      state.user = payload;
      return { ...state };
    case LOGOUT:
      state.user = {};
      return { ...state };
    default:
      return state;
  }
};

export default user__reducer;

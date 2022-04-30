import {
  GET__INFO,
  GET__USER,
  GET__USERS,
  LOGOUT,
} from "./../constants/redux__const";

const initialState = {
  user: {},
  users: [],
  user__info: {},
};

const user__reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET__INFO:
      state.user = payload;
      return { ...state };
    case LOGOUT:
      state.user = {};
      return { ...state };
    case GET__USERS:
      state.users = payload;
      return { ...state };
    case GET__USER:
      state.user__info = payload;
      return { ...state };

    default:
      return state;
  }
};

export default user__reducer;

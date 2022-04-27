import { combineReducers } from "redux";
import user__reducer from "./user__reducer";
import product__reducer from './product__reducer';
import product__type__reducer from './product__type__reducer';
import cart__reducer from './cart__reducer';
const root__reducer = combineReducers({
  user__reducer,
  product__reducer,
  product__type__reducer,
  cart__reducer
});

export default root__reducer;

import { combineReducers } from "redux";
import user__reducer from "./user__reducer";
import product__reducer from './product__reducer';
import product__type__reducer from './product__type__reducer';
import cart__reducer from './cart__reducer';
import invoice__reducer from './invoice__reducer';
import common__reducer from './common__reducer';
const root__reducer = combineReducers({
  user__reducer,
  product__reducer,
  product__type__reducer,
  cart__reducer,
  invoice__reducer,
  common__reducer
});

export default root__reducer;

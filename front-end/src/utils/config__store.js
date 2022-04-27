import { applyMiddleware, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import root__reducer from "../redux/reducers/root__reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
    root__reducer,
    composeEnhancers(applyMiddleware(thunk))
);
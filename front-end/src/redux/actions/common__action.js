import { START__LOADING, STOP__LOADING } from "../constants/redux__const";

export const startLoadingAction = (dispatch) => {
  console.log(123);
  dispatch({
    type: START__LOADING,
  });
};

export const endLoadingAction = (dispatch) => {
  dispatch({
    type: STOP__LOADING,
  });
};

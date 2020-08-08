import { combineReducers } from "redux";
import authReducer from "./auth";
import commonReducer from "./common";

const appReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
});

const reducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default reducer;

import { combineReducers } from "redux";
import authReducer from "./auth";
import commonReducer from "./common";
import emailReducer from "./email";

const appReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  email: emailReducer,
});

const reducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default reducer;

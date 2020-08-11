import {
  EMAIL_PENDING,
  EMAIL_COMPLETED,
  EMAIL_ERROR,
  EMAIL_SUCCESS,
  EMAIL_ALREADY_VERIFIED,
} from "./types";

const initialState = {
  loading: false,
  success: false,
  error: false,
  saving: false,
  isEmailVerified: false,
  message: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_PENDING:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case EMAIL_COMPLETED:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case EMAIL_ALREADY_VERIFIED:
      return {
        ...state,
        loading: false,
        isEmailVerified: true,
        message: action.data,
      };
    case EMAIL_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        success: false,
        message: action.data,
      };
    default:
      return state;
  }
};

export default reducer;

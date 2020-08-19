import {
  LOGIN_PENDING,
  PARTIAL_LOGIN_COMPLETED,
  LOGIN_COMPLETED,
  LOGIN_ERROR,
  REMEMBER_ME,
  CLOSE_SNACKBAR,
  SIGNUP_COMPLETED,
  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_SUCCESS,
} from "./types";

const initialState = {
  loading: false,
  user: {},
  success: false,
  error: false,
  saving: false,
  error_text: null,
  message: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case PARTIAL_LOGIN_COMPLETED:
      return {
        ...state,
        loading: false,
        error: false,
        user: action.data,
      };
    case LOGIN_COMPLETED:
      return {
        ...state,
        loading: false,
        error: false,
        user: action.data,
        success: true,
        message: `${action.data.email} is successfully loggedIn!`,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.err,
      };
    case SIGNUP_COMPLETED:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        user: action.data,
      };
    case RESET_PASSWORD_PENDING:
      return {
        ...state,
        loading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        error: false,
        message: null,
      };

    case REMEMBER_ME:
      return {
        ...state,
        rememberMe: !state.rememberMe,
      };

    default:
      return state;
  }
};

export default reducer;

import { SIGNUP_COMPLETED, CLOSE_SNACKBAR, LOGOUT } from "./types";
// CAll common action creator to set error
import {
  startFetching,
  fetchingCompleted,
  setError,
  setSuccess,
} from "../../store/common/actions";
import AuthService from "../../services/auth.service";

export const closeSnackbar = () => {
  return {
    type: CLOSE_SNACKBAR,
  };
};

const signupComplete = (data) => ({
  type: SIGNUP_COMPLETED,
  data,
});

export const signupPatient = (data) => {
  return (dispatch) => {
    dispatch(startFetching());
    AuthService.register(data).then(
      (response) => {
        dispatch(signupComplete(response));
        dispatch(setSuccess(`${data.email} ${response.data.message}`));
        dispatch(fetchingCompleted());
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        let severity = "error";
        if (error.response.status === 403) {
          severity = "warning";
        }
        dispatch(fetchingCompleted());
        dispatch(
          setError({
            severity: severity,
            message: resMessage,
          })
        );
      }
    );
  };
};

export const logOut = () => {
  localStorage.removeItem("patient");
  return {
    type: LOGOUT,
  };
};

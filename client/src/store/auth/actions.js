import { SIGNUP_COMPLETED, CLOSE_SNACKBAR, LOGOUT } from "./types";
// CAll common action creator to set error
import {
  startFetching,
  fetchingCompleted,
  setError,
  setSuccess,
} from "../../store/common/actions";
import { sendVerificationEmail } from "./../email/actions";
import AuthService from "../../services/auth.service";
import EmailService from "../../services/email.service";

export const closeSnackbar = () => {
  return {
    type: CLOSE_SNACKBAR,
  };
};

const signupComplete = (data) => ({
  type: SIGNUP_COMPLETED,
  data,
});

export const verificationEmail = (userId, token) => {
  return (dispatch) => {
    dispatch(startFetching());
    EmailService.emailVerify(userId, token).then(
      (response) => {
        dispatch(setSuccess(`${response.data.message}`));
        console.log("EmailService.emailVerify:", response);
        dispatch(fetchingCompleted());
      },
      (error) => {
        console.log("EmailService emailVerify error:", error);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch(fetchingCompleted());
        let severity = "error";
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

export const signupPatient = (data) => {
  return (dispatch) => {
    dispatch(startFetching());
    AuthService.register(data).then(
      (response) => {
        dispatch(signupComplete(response));
        //TODO: Send email verification email
        /**
         * {"status":"success","message":"User succesfullly registered!","data":{"user":{"id":11,"client_id":68,"firstName":null,"lastName":null,"email":"d@domain.com"},"client":{"id":68,"name":"Pracitce name","email":null}}}
         */
        if (response.data) {
          dispatch(sendVerificationEmail(response.data.data.user));
        }
        dispatch(setSuccess(`${response.data.message}`));
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

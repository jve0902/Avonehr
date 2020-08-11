import {
  EMAIL_PENDING,
  EMAIL_COMPLETED,
  EMAIL_ERROR,
  EMAIL_SUCCESS,
  EMAIL_ALREADY_VERIFIED,
} from "./types";
// CAll common action creator to set error
import {
  startFetching,
  fetchingCompleted,
  setError,
  setSuccess,
} from "../../store/common/actions";

import EmailService from "../../services/email.service";

export const startEmail = () => {
  return {
    type: EMAIL_PENDING,
  };
};

const emailComplete = (data) => ({
  type: EMAIL_COMPLETED,
  data,
});

const emailSuccess = (data) => ({
  type: EMAIL_SUCCESS,
  data,
});

const emailError = (data) => ({
  type: EMAIL_ERROR,
  data,
});

export const emailAlreadyVerified = (data) => {
  return {
    type: EMAIL_ALREADY_VERIFIED,
    data,
  };
};

export const verificationEmail = (userId, token) => {
  return (dispatch) => {
    dispatch(startEmail());
    EmailService.emailVerify(userId, token).then(
      (response) => {
        dispatch(setSuccess(`${response.data.message}`));
        console.log("EmailService.emailVerify:", response);
        if (response.data.isVerified) {
          dispatch(emailAlreadyVerified(response.data.message));
        }
        dispatch(emailSuccess());
      },
      (error) => {
        console.log("EmailService emailVerify error:", error);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch(emailError(resMessage));
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

export const sendVerificationEmail = (data) => {
  return (dispatch) => {
    dispatch(startFetching());
    EmailService.sendEmailVerification(data).then(
      (response) => {
        console.log("EmailService.sendEmailVerification:", response);
      },
      (error) => {
        console.log("EmailService error:", error);
      }
    );
  };
};

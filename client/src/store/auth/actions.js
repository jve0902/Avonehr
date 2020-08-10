import { CLOSE_SNACKBAR, LOGOUT } from "./types";

export const closeSnackbar = () => {
  return {
    type: CLOSE_SNACKBAR,
  };
};

export const signupPatient = () => {};

export const logOut = () => {
  localStorage.removeItem("patient");
  return {
    type: LOGOUT,
  };
};

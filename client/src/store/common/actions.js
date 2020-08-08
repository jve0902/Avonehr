import {
  START_FETCHING,
  FETCHING_COMPLETED,
  SET_ERROR,
  HIDE_ERROR,
  CLOSE_SNACKBAR,
  SET_SUCCESS,
} from "./types";

export const startFetching = () => {
  return {
    type: START_FETCHING,
  };
};

export const fetchingCompleted = () => {
  return {
    type: FETCHING_COMPLETED,
  };
};

export const setError = (error) => {
  return {
    type: SET_ERROR,
    error: error,
  };
};

export const setSuccess = (message) => {
  return {
    type: SET_SUCCESS,
    message: message,
  };
};

export const hideError = () => {
  return {
    type: HIDE_ERROR,
  };
};

export const closeSnackbar = () => {
  return {
    type: CLOSE_SNACKBAR,
  };
};

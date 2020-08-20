import axios from "axios";
import { UNAUTH_USER } from "./store/auth/types";
import { setError } from "./store/common/actions";

export default {
  setupInterceptors: (store) => {
    // Add a response interceptor
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        //catches if the session ended!
        if (error.message === "Network Error" && !error.response) {
          store.dispatch(
            setError({
              severity: "error",
              message: "Network error - make sure API is running",
            })
          );
        }
        if (error.response) {
          const { status, data } = error.response;
          let severity = "error";
          if (status === 403) {
            severity = "warning";
          }
          console.log("data", data);
          console.log("status", status);
          // 400 usually for form validation, so we would like to skip redux
          if (status === 400) {
            return Promise.reject(error);
          }
          const resMessage =
            (data && data.message) || error.message || error.toString();
          console.log("resMessage", resMessage);
          store.dispatch(
            setError({
              severity: severity,
              message: resMessage,
            })
          );
          //TODO:: Check access token validaity on backend and handle on fronend client
          if (data.token && data.token.KEY === "ERR_EXPIRED_TOKEN") {
            console.log("EXPIRED TOKEN!");
            localStorage.clear();
            store.dispatch({ type: UNAUTH_USER });
          }
        }
        console.log("error", error);

        return Promise.reject(error);
      }
    );
  },
};

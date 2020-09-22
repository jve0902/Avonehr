import axios from "axios";
import authHeader from "./../services/auth-header";

const api =
  `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";

export const fetchClientAgreement = () =>
  axios
    .get(`${api}/client/agreement`, {
      headers: authHeader(),
    })
    .then((res) => res.data);

export const search = (searchTerm) =>
  axios
    .get(`${api}/search/?query=${searchTerm}`, {
      headers: authHeader(),
    })
    .then((res) => res.data);

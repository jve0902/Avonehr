import axios from "axios";

const api =
  `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";

export const fetchClientAgreement = () =>
  axios.get(`${api}/client/agreement`).then((res) => res.data);

export const fetchAppointmentTypes = () =>
  axios.get(`${api}/appointment-types`).then((res) => res.data);

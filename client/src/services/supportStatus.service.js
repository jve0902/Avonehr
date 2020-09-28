import axios from "axios";
import authHeader from "./auth-header";

const API_BASE =
  `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";

class SupportAPI {
  getStatus = () => {
    return axios.get(`${API_BASE}/support/status`, {
      headers: authHeader(),
    });
  };
  getSuport = (status) => {
    return axios.get(`${API_BASE}/support?cStatus=${status}`, {
      headers: authHeader(),
    });
  };
}

export default new SupportAPI();

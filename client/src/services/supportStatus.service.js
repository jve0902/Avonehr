import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE } from "./../utils/API_BASE";

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

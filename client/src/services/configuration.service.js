import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE } from "./../utils/API_BASE";

class Configuration {
  getConfig(data) {
    return axios.get(API_BASE + `/config`, {
      headers: authHeader(),
    });
  }
  getConfigHistory(data) {
    return axios.get(API_BASE + `/config/history`, {
      headers: authHeader(),
    });
  }
  updateConfig(id, data) {
    return axios.put(`${API_BASE}/config/${id}`, data, {
      headers: authHeader(),
    });
  }
}

export default new Configuration();

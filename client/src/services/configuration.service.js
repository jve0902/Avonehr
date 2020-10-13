import axios from "axios";

import { API_BASE } from "./../utils/API_BASE";
import authHeader from "./auth-header";

class Configuration {
  getConfig(data) {
    return axios.get(API_BASE + `/config`, {
      headers: authHeader()
    });
  }
  getConfigHistory(data) {
    return axios.get(API_BASE + `/config/history`, {
      headers: authHeader()
    });
  }
  updateConfig(id, data) {
    return axios.put(`${API_BASE}/config/${id}`, data, {
      headers: authHeader()
    });
  }
}

export default new Configuration();

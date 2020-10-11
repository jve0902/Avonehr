import axios from "axios";
import authHeader from "./auth-header";

import { API_BASE } from "./../utils/API_BASE";

class Appointments {
  getAll() {
    return axios
      .get(API_BASE + `/appointments`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getAllByProvider(providerId) {
    return axios
      .get(API_BASE + `/appointments/${providerId}`, { headers: authHeader() })
      .then((res) => res.data);
  }
  create(payload) {
    return axios.post(API_BASE + `/appointments`, payload, {
      headers: authHeader()
    });
  }
  update(payload) {
    return axios.put(
      API_BASE + `/appointments/update/${payload.data.id}`,
      payload,
      {
        headers: authHeader()
      }
    );
  }
  cancelEvent(payload) {
    return axios.put(
      API_BASE + `/appointments/cancel/${payload.data.id}`,
      payload,
      {
        headers: authHeader()
      }
    );
  }
}

export default new Appointments();

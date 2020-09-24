import axios from "axios";
import authHeader from "./auth-header";

const API_URL =
  `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";

class Appointments {
  getAll() {
    return axios
      .get(API_URL + `/appointments`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getAllByProvider(providerId) {
    return axios
      .get(API_URL + `/appointments/${providerId}`, { headers: authHeader() })
      .then((res) => res.data);
  }
  create(payload) {
    return axios.post(API_URL + `/appointments`, payload, {
      headers: authHeader(),
    });
  }
  update(payload) {
    return axios.put(
      API_URL + `/appointments/update/${payload.data.id}`,
      payload,
      {
        headers: authHeader(),
      }
    );
  }
  cancelEvent(payload) {
    return axios.put(
      API_URL + `/appointments/cancel/${payload.data.id}`,
      payload,
      {
        headers: authHeader(),
      }
    );
  }
}

export default new Appointments();

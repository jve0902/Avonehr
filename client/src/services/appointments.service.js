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
  create(data) {
    return axios.post(API_URL + `/appointments`, data, {
      headers: authHeader(),
    });
  }
  update(data, userId, appointmentId) {
    return axios.put(
      API_URL + `/appointments/${userId}/${appointmentId}`,
      data,
      {
        headers: authHeader(),
      }
    );
  }
  deleteById(id) {
    return axios.delete(API_URL + `/appointments/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new Appointments();

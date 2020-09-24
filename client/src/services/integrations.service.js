import axios from "axios";
import authHeader from "./auth-header";

const API_URL =
  `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";

class AppointmentService {
  getIntegrations() {
    return axios
      .get(API_URL + `/integrations`, { headers: authHeader() })
      .then((res) => res.data);
  }
  update(data) {
    return axios.put(
      API_URL + `/integrations/`,
      data,
      {
        headers: authHeader(),
      }
    );
  }
}

export default new AppointmentService();

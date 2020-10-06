import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE } from "./../utils/API_BASE";

class AppointmentService {
  getAll() {
    return axios
      .get(API_BASE + `/appointment-types`, { headers: authHeader() })
      .then((res) => res.data);
  }
  create(data) {
    return axios.post(API_BASE + `/appointment-types`, data, {
      headers: authHeader(),
    });
  }
  update(data, userId, appointmentId) {
    return axios.put(
      API_BASE + `/appointment-types/${userId}/${appointmentId}`,
      data,
      {
        headers: authHeader(),
      }
    );
  }
  deleteById(id) {
    return axios.delete(API_BASE + `/appointment-types/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new AppointmentService();

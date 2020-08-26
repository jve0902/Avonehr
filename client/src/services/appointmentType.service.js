import axios from "axios";

const API_URL =
  `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";

class AppointmentService {
  getAll() {
    return axios.get(API_URL + `/appointment-types`).then((res) => res.data);
  }
  create(data) {
    return axios.post(API_URL + `/appointment-types`, data);
  }
  update(data, userId, appointmentId) {
    return axios.put(
      API_URL + `/appointment-types/${userId}/${appointmentId}`,
      data
    );
  }
  deleteById(id) {
    return axios.delete(API_URL + `/appointment-types/${id}`);
  }
}

export default new AppointmentService();

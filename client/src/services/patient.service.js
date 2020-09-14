import axios from "axios";
import authHeader from "./auth-header";

const API_URL =
  `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";

class Patient {
  getAllergies() {
    return axios
      .get(API_URL + `/patient/allergies`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getBillings() {
    return axios
      .get(API_URL + `/patient/billing/?limit=3`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getDocuments() {
    return axios
      .get(API_URL + `/patient/documents/1/?tab="Labs"`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getPatientHistory() {
    return axios
      .get(API_URL + `/patient/history`, { headers: authHeader() })
      .then((res) => res.data);
  }
  searchPatient(body) {
    return axios
      .post(API_URL + `patient/search`, body, { headers: authHeader() })
      .then((res) => res.data);
  }
  // create(data) {
  //   return axios.post(API_URL + `/appointments`, data, {
  //     headers: authHeader(),
  //   });
  // }
  // update(data, userId, appointmentId) {
  //   return axios.put(
  //     API_URL + `/appointments/${userId}/${appointmentId}`,
  //     data,
  //     {
  //       headers: authHeader(),
  //     }
  //   );
  // }
  // deleteById(id) {
  //   return axios.delete(API_URL + `/appointments/${id}`, {
  //     headers: authHeader(),
  //   });
  // }
}

export default new Patient();

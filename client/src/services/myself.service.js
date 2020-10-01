import axios from "axios";
import authHeader from "./auth-header";

const API_URL =
  `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";

class MySelfService {
  getProfile(userId) {
    return axios
      .get(API_URL + `/myself/profile/${userId}`, { headers: authHeader() })
      .then((res) => res.data);
  }
  updateProfile(payload, userId) {
    return axios.put(API_URL + `/myself/profile/${userId}`, payload, {
      headers: authHeader(),
    });
  }
  getForwardEmail(userId) {
    return axios
      .get(API_URL + `/myself/forward-email/${userId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
  getLogins(userId) {
    return axios
      .get(API_URL + `/myself/logins/${userId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
  getActivityHistory(userId) {
    return axios
      .get(API_URL + `/myself/activity-history/${userId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new MySelfService();

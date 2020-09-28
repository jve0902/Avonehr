import axios from "axios";
import authHeader from "./auth-header";

const API_URL =
  `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";

class DashboardHome {
  getProviders() {
    return axios
      .get(API_URL + `/providers`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getProviderDetails() {
    return axios
      .get(API_URL + `/providers-details`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getPatientUnreadMessages(providerId) {
    return axios
      .get(API_URL + `/unread-messages/${providerId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
  getPatientApptRequests(providerId) {
    return axios
      .get(API_URL + `/appointment-requests/${providerId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new DashboardHome();

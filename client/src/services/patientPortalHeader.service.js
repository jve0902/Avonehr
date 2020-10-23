import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE } from "./../utils/API_BASE";

class PatientPortalHeader {
  getClientPortalHeader() {
    return axios.get(`${API_BASE}/patient-portal-header`, {
      headers: authHeader()
    });
  }
}

export default new PatientPortalHeader();

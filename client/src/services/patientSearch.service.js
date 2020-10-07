import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE } from "./../utils/API_BASE";

class SearchPatient {
  search(data) {
    return axios.post(API_BASE + `/client/patient-search`, data, {
      headers: authHeader(),
    });
  }
}

export default new SearchPatient();

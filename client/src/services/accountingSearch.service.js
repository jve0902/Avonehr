import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE } from "./../utils/API_BASE";

class Accounting {
  search(data) {
    return axios.post(API_BASE + `/client/accounting/search`, data, {
      headers: authHeader(),
    });
  }
  searchType() {
    return axios.get(`${API_BASE}/client/accounting`, {
      headers: authHeader(),
    });
  }
}

export default new Accounting();

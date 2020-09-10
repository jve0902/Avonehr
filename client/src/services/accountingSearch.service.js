import axios from "axios";
import authHeader from "./auth-header";

const API_URL =
  `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";

class Accounting {
  search(data) {
    return axios.post(API_URL + `/client/accounting/search`, data, {
      headers: authHeader(),
    });
  }
}

export default new Accounting();

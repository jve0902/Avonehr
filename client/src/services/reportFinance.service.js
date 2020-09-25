import axios from "axios";
import authHeader from "./auth-header";

const API_URL =
  `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";

class ReportFinanceService {
  getAll(from, to) {
    return axios
      .get(API_URL + `/report-finance?from=${from}&to=${to}`, { headers: authHeader() })
      .then((res) => res.data);
  }
}

export default new ReportFinanceService();

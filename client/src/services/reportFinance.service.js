import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE } from "./../utils/API_BASE";

class ReportFinanceService {
  getAll(from, to) {
    return axios
      .get(API_BASE + `/report-finance?from=${from}&to=${to}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new ReportFinanceService();

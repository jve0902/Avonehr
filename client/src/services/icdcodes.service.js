import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE } from "./../utils/API_BASE";

class Icdcodes {
  search(data) {
    return axios.post(API_BASE + `/icd`, data, { headers: authHeader() });
  }
  addFavorite(id, userId, data) {
    return axios.post(API_BASE + `/icd/${id}/${userId}`, data, {
      headers: authHeader(),
    });
  }
  deleteFavorite(id) {
    return axios.delete(API_BASE + `/icd/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new Icdcodes();

import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE } from "./../utils/API_BASE";

class Drugs {
  search(data) {
    return axios.post(API_BASE + `/drug/`, data, {
      headers: authHeader(),
    });
  }
  addFavorite(id, userId, data) {
    return axios.post(API_BASE + `/drug/${id}/${userId}`, data, {
      headers: authHeader(),
    });
  }
  deleteFavorite(id) {
    return axios.delete(API_BASE + `/drug/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new Drugs();

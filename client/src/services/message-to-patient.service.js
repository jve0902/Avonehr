import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./../utils/API_URL";

class Messages {
  getMessageByID(id) {
    return axios
      .get(API_URL + `/message/${id}`, { headers: authHeader() })
      .then((res) => res.data);
  }
  create(payload) {
    return axios.post(API_URL + `/message`, payload, {
      headers: authHeader(),
    });
  }
  update(payload) {
    return axios.put(API_URL + `/message/${payload.data.id}`, payload, {
      headers: authHeader(),
    });
  }
}

export default new Messages();

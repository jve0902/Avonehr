import axios from "axios";

import { API_BASE } from "./../../utils/API_BASE";

class AuthService {
  async login(user) {
    const loginResponse = await axios.post(API_BASE + "/auth/patient/login", {
      client_id: user.client_id,
      email: user.email,
      password: user.password,
    });
    if (loginResponse.data) {
      if (loginResponse.data.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(loginResponse.data.data));
      }
      return loginResponse.data;
    }
  }

  getClientCode(clientCode) {
    return axios
      .get(API_BASE + `/auth/patient/client/?c=${clientCode}`)
      .then((res) => res.data);
  }
}

export default new AuthService();

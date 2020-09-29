import axios from "axios";

const API_URL =
  `${process.env.REACT_APP_API_URL}api/v1/auth/` ||
  "http://localhost:5000/api/v1/auth/";

class AuthService {
  async login(user) {
    const loginResponse = await axios.post(API_URL + "login", {
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
      .get(API_URL + `patient/client/?c=${clientCode}`)
      .then((res) => res.data);
  }
}

export default new AuthService();

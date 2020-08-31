import axios from "axios";

const API_URL =
  `${process.env.REACT_APP_API_URL}api/v1/auth/` ||
  "http://localhost:5000/api/v1/auth/";

class AuthService {
  /* login(user) {
    return axios
      .post(API_URL + "login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        return response.data;
      });
  } */
  async login(user) {
    const loginResponse = await axios.post(API_URL + "login", {
      email: user.email,
      password: user.password,
    });
    if (loginResponse.data) {
      console.log(user);
      if (loginResponse.data.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(loginResponse.data.data));
      }
      return loginResponse.data;
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  sendEmailVerification(user) {
    return axios.post(API_URL + `email/send/confirmation/${user}`);
  }
  passwordChangeRequest(email) {
    return axios.post(API_URL + `reset_password/user/${email}`);
  }
  resetPassword(userId, token, password) {
    return axios.post(API_URL + `reset/${userId}/${token}`, {
      password: password,
    });
  }

  register(user) {
    return axios.post(API_URL + "signup", user);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  checkAuth() {
    const user = JSON.parse(localStorage.getItem("user"));
    //TODO:: Need Token validation check
    if (user && user.accessToken) {
      return true;
    } else {
      return false;
    }
  }

  validate(data) {
    return axios.post(API_URL + `field/validate`, data);
  }
}

export default new AuthService();

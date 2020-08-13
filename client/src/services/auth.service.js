import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:5000/api/v1/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        console.log("response.data", response.data.data);
        debugger;
        if (response.data.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        return response.data;
      });
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

import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:5001/api/auth/";

class AuthService {
  login(patient) {
    return axios
      .post(API_URL + "login", {
        email: patient.email,
        password: patient.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("patient", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("patient");
  }

  passwordChangeRequest(email) {
    return axios.post(API_URL + `reset_password/patient/${email}`);
  }
  resetPassword(patientId, token, password) {
    return axios.post(API_URL + `reset/${patientId}/${token}`, {
      password: password,
    });
  }

  register(patient) {
    return axios.post(API_URL + "signup", {
      email: patient.email,
      password: patient.password,
      gender: patient.gender,
    });
  }

  getCurrentPatient() {
    return JSON.parse(localStorage.getItem("patient"));
  }

  checkAuth() {
    const patient = JSON.parse(localStorage.getItem("patient"));
    //TODO:: Need Token validation check
    if (patient && patient.accessToken) {
      return true;
    } else {
      return false;
    }
  }
}

export default new AuthService();

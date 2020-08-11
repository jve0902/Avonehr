import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:5000/api/v1/email";

class EmailService {
  sendEmailVerification(user) {
    return axios.post(API_URL + `/send/verification/`, user);
  }
  emailVerify(userId, token) {
    return axios.get(API_URL + `/confirmation/${userId}/${token}`);
  }
}

export default new EmailService();

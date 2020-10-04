import axios from "axios";
import { API_BASE } from "./../utils/API_BASE";

class EmailService {
  sendEmailVerification(user) {
    return axios.post(API_BASE + `/send/verification/`, user);
  }
  resendEmailVerification(user) {
    return axios.post(API_BASE + `/resend/verification/`, user);
  }
  emailVerify(userId, token) {
    return axios.get(API_BASE + `/confirmation/${userId}/${token}`);
  }
}

export default new EmailService();

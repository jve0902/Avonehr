import axios from "axios";

const API_URL =
  `${process.env.REACT_APP_API_URL}api/v1/email` ||
  "http://localhost:5000/api/v1/email";

class EmailService {
  sendEmailVerification(user) {
    return axios.post(API_URL + `/send/verification/`, user);
  }
  resendEmailVerification(user) {
    return axios.post(API_URL + `/resend/verification/`, user);
  }
  emailVerify(userId, token) {
    return axios.get(API_URL + `/confirmation/${userId}/${token}`);
  }
}

export default new EmailService();

import axios from 'axios';
import authHeader from './auth-header';

const API_URL =
  `${process.env.REACT_APP_API_URL}api/v1` || 'http://localhost:5000/api/v1';

class Accounting {
  getAccounting(data) {
    console.log(data);
    return axios
      .get(
        API_URL + `/client/accounting/search`,
        {
          headers: authHeader(),
        },
        { data }
      )
      .then((res) => res.data);
  }
  //   create(data) {
  //     return axios.post(API_URL + `/appointment-types`, data, {
  //       headers: authHeader(),
  //     });
  //   }
  //   update(data, userId, appointmentId) {
  //     return axios.put(
  //       API_URL + `/appointment-types/${userId}/${appointmentId}`,
  //       data,
  //       {
  //         headers: authHeader(),
  //       }
  //     );
  //   }
  //   deleteById(id) {
  //     return axios.delete(API_URL + `/appointment-types/${id}`, {
  //       headers: authHeader(),
  //     });
  //   }
}

export default new Accounting();

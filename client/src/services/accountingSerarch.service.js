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
}

export default new Accounting();

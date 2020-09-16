import axios from "axios";
import authHeader from "./auth-header";

const API_URL =
  `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";

class Patient {
  getAllergies() {
    return axios
      .get(API_URL + `/patient/allergies`, { headers: authHeader() })
      .then((res) => res.data);
  }
  searchAllergies(data) {
    return axios
      .post(API_URL + `/patient/allergies/search`, data, { headers: authHeader() })
      .then((res) => res.data);
  }
  getForms() {
    return axios
      .get(API_URL + `/patient/forms`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getBillings() {
    return axios
      .get(API_URL + `/patient/billing/?limit=3`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getDocuments() {
    return axios
      .get(API_URL + `/patient/documents/1/?tab="Labs"`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getPatientData() {
    return axios
      .get(API_URL + `/patient`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getPatientHistory() {
    return axios
      .get(API_URL + `/patient/history`, { headers: authHeader() })
      .then((res) => res.data);
  }
  searchPatient(data) {
    return axios
      .post(API_URL + `/patient/search`, data, { headers: authHeader() })
      .then((res) => res.data);
  }
  getEncounters() {
    return axios
      .get(API_URL + `/patient/encounters/1`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getMedicalNotes() {
    return axios
      .get(API_URL + `/patient/medical-notes/history`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getMessages() {
    return axios
      .get(API_URL + `/patient/messages`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getDiagnoses() {
    return axios
      .get(API_URL + `/patient/diagnoses/1/?active=true`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getMedications() {
    return axios
      .get(API_URL + `/patient/medications/1`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getRequisitions() {
    return axios
      .get(API_URL + `/patient/requisitions/1`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getTests() {
    return axios
      .get(API_URL + `/patient/all-tests/1`, { headers: authHeader() })
      .then((res) => res.data);
  }
}

export default new Patient();

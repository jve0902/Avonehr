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

  //update methods
  updateAdminNotes(data, noteId) {
    return axios.put(
      API_URL + `/patient/admin-note/${noteId}`,
      data,
      {
        headers: authHeader(),
      }
    );
  }

  updateMedicalNotes(data, noteId) {
    return axios.put(
      API_URL + `/patient/medical-notes/history/${noteId}`,
      data,
      {
        headers: authHeader(),
      }
    );
  }

  updateDiagnoses(data, id) {
    return axios.put(
      API_URL + `/patient/diagnoses/1/${id}`,
      data,
      {
        headers: authHeader(),
      }
    );
  }

  //create methods
  createDocuments(data) {
    return axios.post(API_URL + `/patient/documents`, data, {
      headers: authHeader(),
    });
  }

  createAllergy(data) {
    return axios.post(API_URL + `/patient/allergies`, data, {
      headers: authHeader(),
    });
  }

  createDiagnoses(data) {
    return axios.post(API_URL + `/patient/diagnoses`, data, {
      headers: authHeader(),
    });
  }

  //delete methods
  deleteMessages(id) {
    return axios.delete(API_URL + `/patient/messages/${id}`, {
      headers: authHeader(),
    });
  }

  deleteAllergy(id) {
    return axios.delete(API_URL + `/patient/allergies/1/${id}`, {
      headers: authHeader(),
    });
  }

  deleteDocument(id) {
    return axios.delete(API_URL + `/patient/documents/${id}`, {
      headers: authHeader(),
    });
  }
  
  deleteDiagnoses(id) {
    return axios.delete(API_URL + `/patient/diagnoses/1/${id}`, {
      headers: authHeader(),
    });
  }

  deleteMedications(id) {
    return axios.delete(API_URL + `/patient/medications/1/1/${id}`, {
      headers: authHeader(),
    });
  }

  deleteRequisitions(id) {
    return axios.delete(API_URL + `/patient/requisitions/1/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new Patient();

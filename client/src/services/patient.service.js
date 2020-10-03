import axios from "axios";
import authHeader from "./auth-header";

const API_URL =
  `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";

class Patient {
  getCardsLayout(user_id) {
    return axios
      .get(API_URL + `/patient-layout/${user_id}`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getAllergies(patient_id) {
    return axios
      .get(API_URL + `/patient/${patient_id}/allergies`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getAllHandouts(patient_id) {
    return axios
      .get(API_URL + `/patient/${patient_id}/handouts`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getPatientHandouts(patient_id) {
    return axios
      .get(API_URL + `/patient/${patient_id}/handouts`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getForms(patient_id) {
    return axios
      .get(API_URL + `/patient/${patient_id}/forms`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getBillings(patient_id, limit) {
    return axios
      .get(API_URL + `/patient/${patient_id}/billing/?limit=${limit}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
  getDocuments(patient_id, tab) {
    return axios
      .get(API_URL + `/patient/${patient_id}/documents/?tab="${tab}"`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
  getPatientData(patient_id) {
    return axios
      .get(API_URL + `/patient/${patient_id}`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getPatientHistory(patient_id) {
    return axios
      .get(API_URL + `/patient/${patient_id}/history`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
  searchPatient(patient_id, data) {
    return axios
      .post(API_URL + `/patient/${patient_id}/search`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
  getEncounters(patient_id) {
    return axios
      .get(API_URL + `/patient/${patient_id}/encounters`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
  getMedicalNotes(patient_id) {
    return axios
      .get(API_URL + `/patient/${patient_id}/medical-notes/history`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
  getAdminNotesHistory(patient_id) {
    return axios
      .get(API_URL + `/patient/${patient_id}/admin-note/history`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
  getMessages(patient_id) {
    return axios
      .get(API_URL + `/patient/${patient_id}/messages`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getDiagnoses(patient_id) {
    return axios
      .get(API_URL + `/patient/${patient_id}/diagnoses/?active=true`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
  getMedications(patient_id) {
    return axios
      .get(API_URL + `/patient/${patient_id}/medications`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
  getRequisitions(patient_id) {
    return axios
      .get(API_URL + `/requisitions/${patient_id}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
  getTests(patient_id) {
    return axios
      .get(API_URL + `/patient/${patient_id}/all-tests`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  //search methods
  searchAllergies(data) {
    return axios
      .post(API_URL + `/patient/allergies/search`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  searchDiagnosis(data) {
    return axios
      .post(API_URL + `/patient/diagnoses/search`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  //update methods
  updateCardsLayout(user_id, layout) {
    return axios
      .post(API_URL + `/patient-layout/${user_id}`, layout, { headers: authHeader() })
      .then((res) => res.data);
  }

  updateAdminNotes(patient_id, data, noteId) {
    return axios.put(API_URL + `/patient/${patient_id}/admin-note/${noteId}`, data, {
      headers: authHeader(),
    });
  }
  // /patient/1/medical-notes/history
  updateMedicalNotes(patient_id, data) {
    return axios.put(
      API_URL + `/patient/${patient_id}/medical-notes/history`,
      data,
      {
        headers: authHeader(),
      }
    );
  }

  updateDiagnoses(data, encounter_id, icd_id) {
    return axios.put(
      API_URL + `/patient/diagnoses/${encounter_id}/${icd_id}`,
      data,
      {
        headers: authHeader(),
      }
    );
  }

  //create methods
  createPatientHandout(patient_id, data) {
    return axios.post(API_URL + `/patient/${patient_id}/patient-handout`, data, {
      headers: authHeader(),
    });
  }

  createDocuments(patient_id, data) {
    return axios.post(API_URL + `/patient/${patient_id}/documents/`, data, {
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

  createMessage(patient_id, data) {
    return axios.post(API_URL + `/patient/${patient_id}/messages`, data, {
      headers: authHeader(),
    });
  }

  //delete methods
  deleteMessages(id) {
    return axios.delete(API_URL + `/patient/messages/${id}`, {
      headers: authHeader(),
    });
  }

  deleteAllergy(patient_id, drug_id) {
    return axios.delete(
      API_URL + `/patient/allergies/${patient_id}/${drug_id}`,
      {
        headers: authHeader(),
      }
    );
  }

  deletePatientHandout(patient_id, handoutId) {
    return axios.delete(
      API_URL + `/patient/patient-handout/${patient_id}/${handoutId}`,
      {
        headers: authHeader(),
      }
    );
  }

  deleteHandout(handoutId) {
    return axios.delete(API_URL + `/patient/handouts/${handoutId}`, {
      headers: authHeader(),
    });
  }

  deleteDocument(patient_id, tab) {
    return axios.delete(
      API_URL + `/patient/documents/${patient_id}/?tab="${tab}"`,
      {
        headers: authHeader(),
      }
    );
  }

  deleteDiagnoses(encounter_id, icd_id) {
    return axios.delete(
      API_URL + `/patient/diagnoses/${encounter_id}/${icd_id}`,
      {
        headers: authHeader(),
      }
    );
  }

  deleteMedications(encounter_id, drug_id, drug_strength_id) {
    return axios.delete(
      API_URL +
        `/patient/medications/${encounter_id}/${drug_id}/${drug_strength_id}`,
      {
        headers: authHeader(),
      }
    );
  }

  deleteRequisitions(encounter_id, cpt_id) {
    return axios.delete(
      API_URL + `/patient/requisitions/${encounter_id}/${cpt_id}`,
      {
        headers: authHeader(),
      }
    );
  }
}

export default new Patient();

import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class LabService {
  // Lab data from dahsboard page
  getLabData(userId) {
    return axios
      .get(`${API_BASE}/lab/${userId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Lab by Id
  getLabById(userId, labId) {
    return axios
      .get(`${API_BASE}/lab/${userId}/${labId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // User History
  getUserHistory(userId) {
    return axios
      .get(`${API_BASE}/lab/user-history/${userId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Lab History
  getLabHistory(labId) {
    return axios
      .get(`${API_BASE}/lab/history/${labId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Lab Values
  getLabValues(labId) {
    return axios
      .get(`${API_BASE}/lab/values/${labId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // update lab status
  updateLab(labId, payload) {
    return axios.put(`${API_BASE}/lab/${labId}`, payload, {
      headers: authHeader(),
    })
      .then((res) => res.data);
  }

  // update lab data
  updateLabData(labId, payload) {
    return axios.put(`${API_BASE}/lab/update/${labId}`, payload, {
      headers: authHeader(),
    })
      .then((res) => res.data);
  }

  // Assignee Users
  getAssigneeUsers() {
    return axios
      .get(`${API_BASE}/lab/assign-user`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new LabService();

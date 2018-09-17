import axios from "axios";

export function addNewSession(payload) {
  return axios.post("/api/sessions", payload);
}

export function editSession(payload) {
  return axios.put("/api/sessions/" + payload.id, payload);
}

export function deleteSession(id) {
  return axios.delete("/api/sessions/" + id);
}

export function getSessionById(id) {
  return axios.get("/api/sessions/" + id);
}

export function getOverallReport(userId) {
  return axios.get("/api/sessions/reports/overall/" + userId);
}

export function getAllSessions(userId) {
  return axios.get("/api/sessions/user/" + userId);
}

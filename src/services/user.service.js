import axios from "axios";

export function postNewUser(payload) {
  return axios.post("/api/users", payload);
}

export function getAllUsers() {
  return axios.get("/api/users");
}

export function removeUser(id) {
  return axios.delete("/api/users/" + id);
}

export function getUser(id) {
  return axios.get("/api/users/" + id);
}

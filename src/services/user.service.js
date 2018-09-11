import axios from "axios";

axios.defaults.withCredentials = true;

export function postNewUser(payload) {
  return axios.post("/api/users/", payload);
}

export function removeUser(id) {
  return axios.delete("/api/users/" + id);
}

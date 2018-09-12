import axios from "axios";

export function postNewUser(payload) {
  return axios.post("/api/users", payload);
}

export function removeUser(id) {
  return axios.delete("/api/users/" + id);
}

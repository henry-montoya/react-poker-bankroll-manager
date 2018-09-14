import axios from "axios";

export function getStartupData() {
  return axios.get("/api/startup");
}

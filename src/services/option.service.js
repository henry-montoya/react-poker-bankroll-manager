import axios from "axios";

export function addGameType(payload) {
  return axios.post("/api/gametypes", payload);
}

export function addGame(payload) {
  return axios.post("/api/games", payload);
}

export function addStake(payload) {
  return axios.post("/api/stakes", payload);
}

export function addLimitType(payload) {
  return axios.post("/api/limitTypes", payload);
}

export function addLocationType(payload) {
  return axios.post("/api/locationTypes", payload);
}

export function addLocation(payload) {
  return axios.post("api/locations", payload);
}

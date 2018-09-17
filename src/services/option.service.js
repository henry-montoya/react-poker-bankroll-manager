import axios from "axios";

export function addGameType(payload) {
  return axios.post("/api/gametypes", payload);
}

export function selectGameType(id) {
  return axios.get("/api/gametypes/" + id);
}

export function addGame(payload) {
  return axios.post("/api/games", payload);
}

export function selectGame(id) {
  return axios.get("/api/games/" + id);
}

export function addStake(payload) {
  return axios.post("/api/stakes", payload);
}

export function selectStake(id) {
  return axios.get("/api/stakes/" + id);
}

export function addLimitType(payload) {
  return axios.post("/api/limittypes", payload);
}

export function selectLimitType(id) {
  return axios.get("/api/limittypes/" + id);
}

export function addLocationType(payload) {
  return axios.post("/api/locationtypes", payload);
}

export function selectLocationType(id) {
  return axios.get("/api/locationtypes/" + id);
}

export function addLocation(payload) {
  return axios.post("/api/locations", payload);
}

export function selectLocation(id) {
  return axios.get("/api/locations/" + id);
}

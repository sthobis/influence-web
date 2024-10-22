import axios from "axios";
import CONFIG from "../config";

const api = axios.create({
  baseURL: CONFIG.API_BASE_URL[process.env.NODE_ENV]
});

export function authAdministrator(body) {
  return api.post("/auth/administrator", body).then(res => res.data);
}

export function authAdvertiser(body) {
  return api.post("/auth/agency", body).then(res => res.data);
}

export function authInfluencer(body) {
  return api.post("/auth/influencer", body).then(res => res.data);
}

export function getAdvertiserById(id) {
  return api.get(`/agency/${id}`).then(res => res.data);
}

export function createInfluencer(body) {
  return api.post("/influencer", body).then(res => res.data);
}

export function getInfluencerList(params) {
  return api.get("/influencer", { params }).then(res => res.data);
}

export function getInfluencerById(id) {
  return api.get(`/influencer/id/${id}`).then(res => res.data);
}

export function getInfluencerByUsername(username) {
  return api.get(`/influencer/username/${username}`).then(res => res.data);
}

export function updateInfluencer(body) {
  return api
    .post(`/influencer/${body.influencer._id}`, body)
    .then(res => res.data);
}

export function crawlInstagramUser(username) {
  return api.get(`/crawler/instagram/${username}`).then(res => res.data);
}

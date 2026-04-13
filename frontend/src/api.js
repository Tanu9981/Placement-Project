import axios from "axios";

const API = axios.create({
  baseURL: "https://placement-project-g1kt.onrender.com/api"
});

// token auto attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
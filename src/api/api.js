// src/api/api.js
import axios from "axios";

const BASE_URL = "https://cloth-trader-backend-production.up.railway.app/api";

const API = axios.create({
  baseURL: BASE_URL
});

export default API;

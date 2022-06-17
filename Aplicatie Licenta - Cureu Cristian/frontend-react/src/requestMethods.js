import axios from "axios";

const BASE_URL = "http://localhost:3001/api";
const TOKEN = localStorage.getItem("user-token");

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { "user-token": TOKEN },
});

"use client"
import axios from "axios";
import { MODE } from "@/app/constants.js";
import { getFreshToken } from "./firebase";



const axiosInstance = axios.create({
  baseURL:
    MODE == "PROD"
      ? "https://api.mymedicos.in/api/v1"
      : "http://localhost:8080/api/v1",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization : `Bearer ${ getFreshToken()}`
  }
});


axiosInstance.interceptors.request.use(
  async (config) => {
      const token = await getFreshToken();
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export {axiosInstance}
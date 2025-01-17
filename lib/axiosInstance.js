"use client"
import axios from "axios";
import { MODE } from "@/app/constants.js";

const getToken = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("token") || "";
  }
  return ""; // Return an empty string on the server
};


const axiosInstance = axios.create({
  baseURL:
    MODE == "PROD"
      ? "https://api.mymedicos.in/api/v1"
      : "http://localhost:8080/api/v1",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization : `Bearer ${ getToken()}`
  }
});

export {axiosInstance}
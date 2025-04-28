import axios from "axios";
import { ORIGIN_URL } from "../constants/Env";

export const axiosInstance = axios.create({
  baseURL: ORIGIN_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

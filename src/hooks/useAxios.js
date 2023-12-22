import axios from "axios";

export const axiosn = axios.create({
  baseURL: import.meta.env.PROD ? "https://fillo-theta.vercel.app/" : "http://localhost:3000",
});

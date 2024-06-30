import axios from "axios";

const baseURL = process.env.BASE_URL || "http://localhost:3001";
const _axios = axios.create({
  baseURL,
});

export default _axios;

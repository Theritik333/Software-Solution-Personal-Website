// import axios from "axios";
// const api = axios.create({ baseURL: "/api", withCredentials: true });
// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  
});
console.log("API URL:", import.meta.env.VITE_API_URL);

export default api;
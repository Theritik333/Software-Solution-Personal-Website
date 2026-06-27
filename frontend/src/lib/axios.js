// import axios from "axios";
// const api = axios.create({ baseURL: "/api", withCredentials: true });
// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://software-solution-personal-website.onrender.com",
  withCredentials: true,
});

export default api;
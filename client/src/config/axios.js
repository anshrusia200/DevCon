import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://devcon-backend-c3zc.onrender.com"
    : "http://localhost:5000";

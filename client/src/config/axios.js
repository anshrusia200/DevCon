import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://devcon-backend-c3zc.onrender.com/api"
    : "http://localhost:5000/api";

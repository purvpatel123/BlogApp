// export const BACKEND_URL = "https://blogapp-1-88un.onrender.com" || "http://localhost:4001";

export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://blogapp-1-88un.onrender.com"
    : "http://localhost:4001";

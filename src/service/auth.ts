import http from "./config";

interface AuthData {
  [key: string]: any;
}

const auth = {
  sign_up: (data: AuthData) => http.post("/auth/register", data),
  sign_in: (data: AuthData) => http.post("/auth/login", data),
  verify_code: (data: AuthData) => http.post("/auth/verify", data),
  forgot_password: (data: AuthData) => http.post("/auth/forgot-password", data),
  verify_forgot_password: (data: AuthData) => http.post("/auth/verify-forgot-password", data),
  update_password: (data: AuthData) => http.post("/auth/update-password", data),
};

export default auth;

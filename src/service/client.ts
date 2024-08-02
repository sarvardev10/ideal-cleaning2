import http from "./config";

interface ClientData {
  [key: string]: any;
}

interface ClientParams {
  [key: string]: any;
}

const client = {
  create: (data: ClientData) => http.post("/client", data),
  get: (params: ClientParams) => http.get("/client/all", { params }),
  delete: (params: ClientParams) => http.delete("/client", { params }),
  update: (data: ClientData) => http.put("/client", data),
};

export default client;

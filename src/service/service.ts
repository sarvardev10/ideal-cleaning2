import http from "./config"

interface ServiceData {
  [key: string]: any;
}

interface ServiceParams {
  [key: string]: any;
}

const service = {
  create: (data: ServiceData) => http.post("/service", data),
  get: (params: ServiceParams) => http.get("/service/all", { params }),
  delete: (id: string | number) => http.delete("/service", { params: { id: id } }),
  update: (data: ServiceData) => http.put("/service", data),
};

export default service;

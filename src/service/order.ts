import http from "./config";

interface OrderData {
  [key: string]: any;
}

interface OrderParams {
  [key: string]: any;
}

const order = {
  create: (data: OrderData) => http.post("/order", data),
  get: (params: OrderParams) => http.get("/order/search", { params }),
  delete: (id: string | number) => http.delete("/order", { params: { id: id } }),
  update: (data: OrderData) => http.put("/order", data),
};

export default order;

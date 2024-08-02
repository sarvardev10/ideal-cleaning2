import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ClientTable } from "@ui";
import { client } from "@service";
import Pagination from "@mui/material/Pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getData = async () => {
    try {
      const response = await client.get(params);
      if (response.status === 200 && response?.data?.clients_list) {
        setData(response?.data?.clients_list);
        let total = Math.ceil(response.data.total / params.limit);
        setCount(total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);

  const handleChange = (event, value) => {
    setParams({
      ...params,
      page: value,
    });
  };

  const deleteItem = async (client_id, owner_id) => {
    const params = { client_id, owner_id };

    try {
      const response = await client.delete({ ...params });
      if (response.status === 200) {
        setData((prevData) => prevData.filter((item) => item.id !== client_id));
        toast.success("Item deleted successfully!");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 mt-12">
        <ClientTable data={data} setData={setData} deleteItem={deleteItem} />
        <Pagination count={count} page={params.page} onChange={handleChange} />
      </div>
      <ToastContainer />
    </>
  );
};

export default Index;

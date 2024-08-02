import React, { useEffect, useState } from "react";
import { Button, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Order } from "@modal";
import { EditOrder } from "@modal";
import { OrderTable } from "@ui";
import { order } from "@service";
import Pagination from "@mui/material/Pagination";

const Index = () => {
  const [openOrder, setOpenOrder] = useState(false);
  const [openEditOrder, setOpenEditOrder] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    name: "",
  });

  const handleOpenOrder = () => setOpenOrder(true);
  const handleCloseOrder = () => setOpenOrder(false);

  const handleOpenEditOrder = () => setOpenEditOrder(true);
  const handleCloseEditOrder = () => setOpenEditOrder(false);

  const getData = async () => {
    try {
      const response = await order.get(params);
      if (response.status === 200 && response?.data?.orders_list) {
        setData(response?.data?.orders_list);
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

  const handleSearchChange = (e) => {
    setParams({
      ...params,
      name: e.target.value,
    });
  };

  return (
    <>
      <Order open={openOrder} handleClose={handleCloseOrder} />
      <EditOrder open={openEditOrder} handleClose={handleCloseEditOrder} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <TextField
          type="text"
            variant="outlined"
            placeholder="Search Orders"
            value={params.search}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            className="border"
          />
          <Button
            className="hover:scale-110 transition-all duration-400"
            onClick={handleOpenOrder}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </div>
        <OrderTable data={data} setData={setData} />
        <Pagination count={count} page={params.page} onChange={handleChange} />
      </div>
    </>
  );
};

export default Index;

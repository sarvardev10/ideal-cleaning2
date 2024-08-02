import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Service } from "@modal";
import { ServiceTable } from "@ui";
import { service } from "@service";
import Pagination from "@mui/material/Pagination";

interface Params {
  limit: number;
  page: number;
}

interface ServiceData {
  id: number;
  name: string;
}

interface ServiceResponse {
  services: ServiceData[];
  total: number;
}

const Index: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<ServiceData[]>([]);
  const [count, setCount] = useState<number>(0);
  const [params, setParams] = useState<Params>({
    limit: 10,
    page: 1,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    try {
      const response = await service.get(params);
      const responseData: ServiceResponse = response.data;
      if (response.status === 200 && responseData.services) {
        setData(responseData.services);
        const total = Math.ceil(responseData.total / params.limit);
        setCount(total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setParams({
      ...params,
      page: value,
    });
  };

  return (
    <>
      <Service open={open} handleClose={handleClose} setData={setData} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <Button
            className="hover:scale-110 transition-all duration-400"
            onClick={handleOpen}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </div>
        <ServiceTable data={data} />
        <Pagination
          count={count}
          page={params.page}
          onChange={handleChangePage}
        />
      </div>
    </>
  );
};

export default Index;

import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { order } from "@service";
import { service } from "@service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const validationSchema = Yup.object({
  amount: Yup.string().required("Amount is required"),
  client_full_name: Yup.string().required("Client full name is required"),
  client_phone_number: Yup.string().required("Client phone number is required"),
  service_id: Yup.string().required("Service id is required"),
});

const Index = ({ open, handleClose, item }) => {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    limit: 5,
    page: 1,
  });

  const getData = async () => {
    try {
      const response = await service.get(params);
      if (response.status === 200 && response?.data?.services) {
        setData(response?.data?.services);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const initialValues = {
    client_full_name: item?.client_full_name ? item.client_full_name : "",
    amount: item?.amount ? item.amount : "",
    client_phone_number: item?.client_phone_number
      ? item?.client_phone_number
      : "",
    service_id: item?.service_id ? item?.service_id : "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await order.create(values);
      if (response.status === 201) {
        toast.success("Order created successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong!");
    }
    // if (item) {
    //   // const payload = { id: item.id, ...values };
    //   // try {
    //   //   const response = await order.update(payload);
    //   //   if (response.status === 200) {
    //   //     toast.success("Order updated successfully!");
    //   //     window.location.reload();
    //   //   }
    //   // } catch (error) {
    //   //   console.log(error.message);
    //   //   toast.error("Something went wrong!");
    //   // }
    // } else {

    // }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            {item ? "Edit Service" : "Create Order"}
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              touched,
              errors,
              handleBlur,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form id="submit" className="mt-6 space-y-4">
                <TextField
                  fullWidth
                  label="Client full name"
                  name="client_full_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.client_full_name}
                  type="text"
                  id="client_full_name"
                  required
                  error={
                    touched.client_full_name && Boolean(errors.client_full_name)
                  }
                  helperText={
                    touched.client_full_name && errors.client_full_name
                  }
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amount}
                  type="number"
                  id="amount"
                  required
                  error={touched.amount && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Client phone number"
                  name="client_phone_number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.client_phone_number}
                  type="text"
                  id="client_phone_number"
                  required
                  error={
                    touched.client_phone_number &&
                    Boolean(errors.client_phone_number)
                  }
                  helperText={
                    touched.client_phone_number && errors.client_phone_number
                  }
                  margin="normal"
                />
                <Select
                  fullWidth
                  label="Service id"
                  name="service_id"
                  onChange={(e) => setFieldValue("service_id", e.target.value)}
                  onBlur={handleBlur}
                  value={values.service_id}
                  id="service_id"
                  required
                  error={touched.service_id && Boolean(errors.service_id)}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Service</em>;
                    }
                    const selectedItem = data.find(
                      (item) => item.id === selected
                    );
                    return selectedItem ? selectedItem.name : "";
                  }}
                >
                  <MenuItem disabled value="">
                    <em>Service</em>
                  </MenuItem>
                  {data.map((item, index) => (
                    <MenuItem value={item.id} key={index}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.service_id && errors.service_id && (
                  <Typography color="error" variant="caption">
                    {errors.service_id}
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="secondary"
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting" : "Save"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Index;

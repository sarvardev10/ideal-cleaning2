import React, { useEffect } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { serviceValidationScheme } from "@validation";
import { service } from "@service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
};

const Service = ({ open, handleClose, item, setData }) => {
  const initialValues = {
    name: item?.name || "",
    price: item?.price || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      if (item?.id) {
        const payload = { id: item.id, ...values };
        response = await service.update(payload);
        if (response.status === 200) {
          window.location.reload();
          toast.success("Service updated successfully!");
          handleClose();
        }
      } else {
        response = await service.create(values);
        if (response.status === 201) {
          window.location.reload();
          toast.success("Service created successfully!");
          handleClose();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
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
            {item ? "Edit Service" : "Create Service"}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={serviceValidationScheme}
          >
            {({
              values,
              handleChange,
              touched,
              errors,
              handleBlur,
              isSubmitting,
            }) => (
              <Form id="submit" className="mt-6 space-y-4">
                <TextField
                  fullWidth
                  label="Service Name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  type="text"
                  id="name"
                  required
                  className="my-2"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  type="number"
                  id="price"
                  required
                  className="my-2"
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                />
                <div className="flex justify-between">
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    type="submit"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting" : "Save"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Service;

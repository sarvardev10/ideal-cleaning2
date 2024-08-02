import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { auth } from "../../../service";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyCodeModal = ({ isOpen, toggle }) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      toggle();
    }

    return () => clearInterval(timer);
  }, [isOpen, countdown, toggle]);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(60);
    }
  }, [isOpen]);

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      toast.warning("Kodni kiriting!");
      return;
    }

    const payload = {
      code: code,
      email: localStorage.getItem("email"),
    };

    try {
      const response = await auth.verify_code(payload);
      if (response.status === 201) {
        toggle();
        if (navigate("/")) {
          toast.success("Kod email ga yuborildi!", {});
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Kod kiritishda xatolik!", {});
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Verify Code</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="verificationCode">Enter Verification Code</Label>
            <Input
              type="text"
              name="verificationCode"
              id="verificationCode"
              value={code}
              onChange={handleChange}
              placeholder="Enter code"
            />
          </FormGroup>
        </Form>
        <div className="text-center mt-4">
          <p>Vaqt tugashiga: {countdown} sekund qoldi.</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Verify
        </Button>{" "}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default VerifyCodeModal;

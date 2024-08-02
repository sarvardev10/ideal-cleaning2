import { useNavigate } from "react-router-dom";
import {Driver} from "@ui";
import { useEffect } from "react";
const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/sign-in");
    }
  }, []);
  return (
    <div>
      <Driver />
    </div>
  );
};

export default Main;

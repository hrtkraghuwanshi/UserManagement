import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  const handlenavigate = () => {
    navigate("/");
    localStorage.setItem("loggedIn", JSON.stringify(false));
  };
  return (
    <>
      <div className="text-center mt-30">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Button
          variant="contained"
          color="primary"
          className="mt-10"
          onClick={() => handlenavigate()}
        >
          Go to Homepage
        </Button>
      </div>
    </>
  );
};

export default NotFound;

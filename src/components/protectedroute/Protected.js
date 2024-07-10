import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const auth = localStorage.getItem("loggedIn");

  return auth==="true" ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;

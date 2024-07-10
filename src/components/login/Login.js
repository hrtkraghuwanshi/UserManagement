import React, { useState, useEffect } from "react";
import "../register/register.scss";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Button, styled } from "@mui/material";
import NotFound from "../errorpage/NotFound";
const StyledButton = styled(Button)({
  backgroundColor: "white",
  color: "black",
  width: "90%",
  height: "40px",
  borderRadius: "40px",
  border: "none",
  outline: "none",
  cursor: "pointer",
  fontSize: "1em",
  fontWeight: 600,
  margin: "10px 20px 0px 20px",
  "&:hover": {
    backgroundColor: "black",
    color: "white",
  },
});
const Login = () => {
  const getItems = JSON.parse(localStorage.getItem("user") || "[]");
  // console.log(getItems);

  const filter = getItems?.filter((item) => item?.flag === 1);
  // console.log(filter);
  const [Email, setEmail] = useState(filter[0]?.Email || "");
  const filterEmail = getItems.find((item) => item.Email === Email);
  // console.log(filterEmail);
  const id = filterEmail?.id;
  const [Password, setPassword] = useState(filter[0]?.Password || "");

  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const user = getItems.find((item) => item.Email === Email);
  // console.log(Email);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Email === "" && Password === "") {
      setAlertType("error");
      setAlertMessage("Please Fill All The  Fields");
      return;
    } else if (Password === "") {
      setAlertType("error");
      setAlertMessage("Please Fill Password Field");
      return;
    } else if (Email === "") {
      setAlertType("error");
      setAlertMessage("Please Fill Email Field");
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Email)) {
      setEmailError("Invalid Email");
      return false;
    } else {
      setEmailError("");
    }
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if (!Password.match(lowerCase)) {
      setPasswordError("Password should contain lowercase letters!");
      return;
    } else if (!Password.match(upperCase)) {
      setPasswordError("Password should contain uppercase letters!");
      return;
    } else if (!Password.match(numbers)) {
      setPasswordError("Password should contains numbers also!");
      return;
    } else if (Password.length < 10) {
      setPasswordError("Password length should be more than 10.");
      return;
    } else {
      setPasswordError("");
    }
    if (user && Password === user.Password && Email === user.Email) {
      const updatedUser = { ...user, flag: 0 };

      const updatedItems = getItems.map((item) =>
        item.Email === Email ? updatedUser : item
      );

      localStorage.setItem("user", JSON.stringify(updatedItems));
      localStorage.setItem("loggedIn", JSON.stringify(true));
      setAlertType("success");
      setAlertMessage("Login successfully");
      setEmail("");
      setPassword("");
      navigate("/dashboard", {
        state: {
          id,
        },
      });
      return;
    } else {
      setAlertType("error");
      setAlertMessage("Invalid Email or Password");
      return;
    }
  };
  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      setAlertType(null);
    }, 3000);

    return () => {
      clearTimeout(alertTimeout);
    };
  }, [alertType]);
  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(false));
  }, []);
  return (
    <>
      <div className="container">
        <div>
          {alertType && (
            <div className="mb-5 w-full">
              <Alert severity={alertType}>
                <AlertTitle>
                  {alertType === "error" ? "Error" : "Success"}
                </AlertTitle>
                {alertMessage}
              </Alert>
            </div>
          )}
        </div>
        <div className="login-container">
          <h1 className="text-center pt-30 text-white text-3xl selection:text-black selection:bg-white">
            Login
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label
                htmlFor="username"
                className=" selection:text-black selection:bg-white"
              >
                Username
              </label>
              <input
                className="text-black"
                type="text"
                id="username"
                autoComplete="off"
                name="username"
                placeholder="Enter your username"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <div
                  style={{
                    color: "red",
                    fontSize: "1.1em",
                    marginTop: "5px",
                  }}
                >
                  {emailError}
                </div>
              )}
            </div>

            <div className="input-container">
              <label
                htmlFor="password"
                className=" selection:text-black selection:bg-white"
              >
                Password
              </label>
              <div className="password-input-container">
                <input
                  className="text-black"
                  type="password"
                  autoComplete="off"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "1.1em",
                      marginTop: "5px",
                    }}
                  >
                    {passwordError}
                  </div>
                )}
              </div>
            </div>
            <StyledButton type="submit">Login</StyledButton>

            <div className="register">
              <p className=" selection:text-black selection:bg-white">
                Don't have an account{" "}
                <a href="/register" className="login_span">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

import React from "react";
import "./register.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Alert, AlertTitle, styled, Button } from "@mui/material";
const Style = styled(Button)({
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
const Register = () => {
  const navigate = useNavigate();
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [gender, setgender] = useState("");
  // console.log(gender);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [userarray, setUserArray] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );
  //   console.log(userarray);
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (
      !Email &&
      !Password &&
      !ConfirmPassword &&
      !Name &&
      !phoneno &&
      !gender
    ) {
      setAlertType("error");
      setAlertMessage("Please Fill All The Fields");
      return;
    } else if (!Name) {
      setAlertType("error");
      setAlertMessage("Please Fill Name Field");
      return;
    } else if (!phoneno) {
      setAlertType("error");
      setAlertMessage("Please Fill PhoneNo Field");
      return;
    } else if (!Email) {
      setAlertType("error");
      setAlertMessage("Please Fill Email Field");
      return;
    } else if (!gender) {
      setAlertType("error");
      setAlertMessage("Please Fill Gender Field");
      return;
    } else if (!Password) {
      setAlertType("error");
      setAlertMessage("Please Fill Password Field");
      return;
    } else if (!ConfirmPassword) {
      setAlertType("error");
      setAlertMessage("Please Fill Confirm-Password Field");
      return;
    }
    if (!/^\d{10}$/.test(phoneno)) {
      setPhoneError("Phone number must be 10 digits.");
      return;
    } else {
      setPhoneError("");
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(Email)) {
      setEmailError("Invalid Email");
      return;
    } else {
      setEmailError("");
    }
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if (!Password.match(lowerCase)) {
      setPasswordError("Password should contains lowercase letters!");
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
    if (Password !== ConfirmPassword) {
      setAlertType("error");
      setAlertMessage("Password Does Not Match");
      return;
    }
    const userData = {
      id: uuidv4(),
      Name: Name,
      Email: Email,
      Password: Password,
      PhoneNo: phoneno,
      Gender: gender,
      flag: 1,
    };

    if (userarray.some((item) => item.Email === Email)) {
      setAlertType("error");
      setAlertMessage("Email already exists");
      return;
    }
    // console.log(userData);
    const updatedUserArray = [...userarray, userData];
    setUserArray(updatedUserArray);
    localStorage.setItem("user", JSON.stringify(updatedUserArray));
   
    setAlertType("success");
    setAlertMessage("Registered successfully");

    navigate("/");
    return;
  };
  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      setAlertType(null);
    }, 3000);

    return () => {
      clearTimeout(alertTimeout);
    };
  }, [alertType]);

  const blockChar = (e) => {
    if (!((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 8)) {
      e.preventDefault();
    }
  };
  return (
    <div className="container">
      <div>
        {alertType && (
          <div className="mb-5 mt-4 w-full">
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
          SignUp
        </h1>
        <form>
          <div className="input-container">
            <label
              htmlFor="username"
              className=" selection:text-black selection:bg-white"
            >
              Name
            </label>
            <input
              className="text-black"
              type="text"
              autoComplete="off"
              name="username"
              placeholder="Enter your username"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label
              htmlFor="Phoneno"
              className=" selection:text-black selection:bg-white"
            >
              PhoneNo
            </label>
            <input
              className="text-black"
              type="text"
              name="phoneno"
              autoComplete="off"
              min="0"
              max="10"
              placeholder="Enter your phoneno"
              value={phoneno}
              onKeyDown={(e) => blockChar(e)}
              onChange={(e) => setPhoneno(e.target.value)}
              required
            />
            {phoneError && (
              <div
                style={{ color: "red", fontSize: "1.1em", marginTop: "5px" }}
              >
                {phoneError}
              </div>
            )}
          </div>
          <div className="input-container">
            <label
              htmlFor="username"
              className=" selection:text-black selection:bg-white"
            >
              Email
            </label>
            <input
              type="text"
              className="text-black"
              name="email"
              autoComplete="off"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              placeholder="Enter your email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && (
              <div
                style={{ color: "red", fontSize: "1.1em", marginTop: "5px" }}
              >
                {emailError}
              </div>
            )}
          </div>
          <div className="gender-container">
            <label htmlFor="gender">Gender &nbsp;:</label>
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              autoComplete="off"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setgender(e.target.value)}
              required
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              name="gender"
              autoComplete="off"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setgender(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label
              htmlFor="password"
              className=" selection:text-black selection:bg-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              className="text-black"
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && (
              <div
                style={{ color: "red", fontSize: "1.1em", marginTop: "5px" }}
              >
                {passwordError}
              </div>
            )}
          </div>
          <div className="input-container">
            <label
              htmlFor="password"
              className=" selection:text-black selection:bg-white"
            >
              Confirm-Password
            </label>
            <input
              type="password"
              autoComplete="off"
              name="password"
              className="text-black"
              placeholder="Enter your confirm-password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Style type="submit" onClick={HandleSubmit}>
            Submit
          </Style>

          <div className="register">
            <p className=" selection:text-black selection:bg-white">
              Already Had An Account {""}
              <a href="/" className="login_span">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

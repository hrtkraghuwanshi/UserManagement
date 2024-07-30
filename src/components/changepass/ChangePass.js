import { React, Suspense, useEffect, useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import Homepage from "../homepage/Homepage";
import { IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./changepass.scss";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ChangePass = () => {
  const location = useLocation();
  const getitem = JSON.parse(localStorage.getItem("user")) || [];
  const filterid = getitem.filter((item) => item.id === location?.state?.id);

  const [curr_showPassword, setcurr_ShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [conf_showPassword, setconf_ShowPassword] = useState(false);
  const [TextFieldData, setTextFieldData] = useState({
    oldpass: filterid[0].Password,
    newpass: "",
    confirmpass: "",
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePassword = (e) => {
    const { name, value } = e.target;
    setTextFieldData({ ...TextFieldData, [name]: value });
  };

  const HandleSubmit = () => {
    if (
      TextFieldData.oldpass === "" &&
      TextFieldData.newpass === "" &&
      TextFieldData.confirmpass === ""
    ) {
      toast.info("Please Fill All Fields");
      return;
    }
    if(TextFieldData.newpass ===""){
      toast.info("New Password is Required");
      return;
    }
    if(TextFieldData.confirmpass ===""){
      toast.info("Confirm Password is Required");
      return;
    }
    if(TextFieldData.oldpass ===""){
      toast.info("Old Password is Required");
      return;
    }
    if (TextFieldData.oldpass !== filterid[0].Password) {
      toast.error("Old Password is Incorrect");
      return;
    }
    if (TextFieldData.newpass !== TextFieldData.confirmpass) {
      toast.error("New Password and Confirm Password should be same");
      return;
    }
    const data = {
      Password: TextFieldData.newpass,
    };

    if (filterid) {
      const index = getitem.findIndex(
        (item) => item.id === location?.state?.id
      );
      if (index !== -1) {
        getitem[index] = { ...getitem[index], ...data };
        localStorage.setItem("user", JSON.stringify(getitem));
        toast.success("Password Updated Successfully");
        setTextFieldData({
          oldpass: TextFieldData.newpass,
          newpass: "",
          confirmpass: "",
        });
      }
    }
  };

  return (
    <Box className="flex">
      <Suspense fallback={<div>Loading...</div>}>
        <Homepage id={location?.state?.id} />
      </Suspense>
      <Box component="main" className="p-3 grow h-16">
        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          autoClose={2000}
          transition={Bounce}
          position="top-right"
        />
        <div className="setting_box">
          <div className="text-3xl text-black font-bold mb-4">
            CHANGE PASSWORD
          </div>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Current Password
            </InputLabel>
            <OutlinedInput
              name="oldpass"
              sx={{ width: "100%" }}
              onChange={(e) => handlePassword(e)}
              value={TextFieldData.oldpass}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <FormControl variant="outlined" className="mt-5" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              New Password
            </InputLabel>
            <OutlinedInput
            sx={{ width: "100%" }}
              name="newpass"
              onChange={(e) => handlePassword(e)}
              value={TextFieldData.newpass}
              type={curr_showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setcurr_ShowPassword((show) => !show)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {curr_showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl variant="outlined" className="mt-5" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              name="confirmpass"
              sx={{ width: "100%" }}
              value={TextFieldData.confirmpass}
              onChange={(e) => handlePassword(e)}
              type={conf_showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setconf_ShowPassword((show) => !show)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {conf_showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <div>
            <Button
              autoFocus
              variant="contained"
              onClick={() => HandleSubmit()}
              sx={{
                margin: "20px 0px 15px 0px",
                backgroundColor: "#9c27b0",
                "&:hover": { backgroundColor: "#9c27b0" },
              }}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ChangePass;

import { React, Suspense, useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import Homepage from "../homepage/Homepage";
import PhoneInput from "react-phone-input-2";
import { useLocation } from "react-router-dom";
import "./setting.scss";
import { Bounce, toast, ToastContainer } from "react-toastify";
const Setting = () => {
  const location = useLocation();
  const getitem = JSON.parse(localStorage.getItem("user")) || [];
  //   console.log(location.state.id);
  const filterid = getitem.filter((item) => item.id === location?.state?.id);
  const [TextFieldData, setTextFieldData] = useState({
    Name: filterid[0]?.Name,
    Email: filterid[0]?.Email,
    gender: filterid[0].Gender,
  });
  const [phoneno, setPhoneno] = useState(filterid[0]?.PhoneNo);

  //   console.log(filterid);
  const handleTextField = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setTextFieldData({ ...TextFieldData, [name]: value });
    // console.log(TextFieldData);
  };
  const HandleSubmit = () => {
    const data = {
      Name: TextFieldData.Name,
      Email: TextFieldData.Email,
      Gender: TextFieldData.gender,

      phoneNo: phoneno,
    };
    if (filterid) {
      const index = getitem.findIndex(
        (item) => item.id === location?.state?.id
      );
      if (index !== -1) {
        getitem[index] = { ...getitem[index], ...data };
        localStorage.setItem("user", JSON.stringify(getitem));
        toast.success("Data Updated Successfully");
      }
      //   getitem[index] = data;
      //   localStorage.setItem("user", JSON.stringify(getitem));
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
            PERSONAL INFORMATION
          </div>
          <TextField
            sx={{ margin: "10px 10px 10px 0px", width: "100%" }}
            name="Name"
            id="outlined-basic"
            label="Name"
            variant="outlined"
            autoComplete="off"
            value={TextFieldData.Name}
            onChange={(e) => handleTextField(e)}
          />

          <div className="mt-5">
            <PhoneInput
              sx={{ margin: "15px 10px 10px 0px", width: "100%" }}
              country={"in"}
              value={phoneno}
              inputStyle={{
                color: "black",
              }}
              buttonStyle={{
                color: "black",
              }}
              placeholder="Enter your phone number"
              inputProps={{
                name: "phoneno",
                required: true,
                autoComplete: "off",
              }}
              onChange={(phone) => setPhoneno(phone)}
            />
          </div>
          <TextField
            sx={{ margin: "35px 10px 10px 0px", width: "100%" }}
            name="Email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            autoComplete="off"
            value={TextFieldData.Email}
            onChange={(e) => handleTextField(e)}
          />

          <FormControl fullWidth className="mt-6">
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              className="h-12"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="gender"
              value={TextFieldData.gender}
              label="Gender"
              onChange={(e) => handleTextField(e)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

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
      </Box>
    </Box>
  );
};

export default Setting;

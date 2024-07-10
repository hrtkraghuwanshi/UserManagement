// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Homepage from "../homepage/Homepage";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import { Alert, AlertTitle } from "@mui/material";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Box, Button, Stack, TextField } from "@mui/material";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const Detailed = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const index = location.state.index;
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [phoneError, setPhoneError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [alertType, setAlertType] = useState(null);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [editedData, setEditedData] = useState({ ...location.state.item });
//   const [tempEditedData, setTempEditedData] = useState({
//     ...location.state.item,
//   });
//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem("user")) || [];
//     setUserData(storedData);
//     setLoading(false);
//   }, []);

//   const handleDelete = (index) => {
//     const updatedData = userData.filter((item, ind) => ind !== index);
//     localStorage.setItem("user", JSON.stringify(updatedData));
//     setUserData(updatedData);

//     if (editedData && editedData.Name === location.state.item.Name) {
//       navigate("/users", { state: { id: location.state.id } });
//     }
//   };

//   const handleEdit = () => {
//     setEditMode(true);
//   };

//   const handleCancelEdit = () => {
//     setEditMode(false);

//     setEditedData({ ...tempEditedData });
//   };

//   // console.log("edited",editedData.Name);

//   const handleSave = () => {
//     if (
//       editedData.Name === "" ||
//       editedData.Email === "" ||
//       editedData.Password === "" ||
//       editedData.Phone === ""
//     ) {
//       setAlertType("error");
//       setAlertMessage("Please Fill All The Fields");
//       return;
//     }
//     if (!/^\d{10}$/.test(editedData.PhoneNo)) {
//       setPhoneError("Phone number must be 10 digits.");
//       return;
//     } else {
//       setPhoneError("");
//     }
//     if (
//       !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(editedData.Email)
//     ) {
//       setEmailError("Invalid Email");
//       return;
//     } else {
//       setEmailError("");
//     }
//     var lowerCase = /[a-z]/g;
//     var upperCase = /[A-Z]/g;
//     var numbers = /[0-9]/g;

//     if (!editedData.Password.match(lowerCase)) {
//       setPasswordError("Password should contains lowercase letters!");
//       return;
//     } else if (!editedData.Password.match(upperCase)) {
//       setPasswordError("Password should contain uppercase letters!");
//       return;
//     } else if (!editedData.Password.match(numbers)) {
//       setPasswordError("Password should contains numbers also!");
//       return;
//     } else if (editedData.Password.length < 10) {
//       setPasswordError("Password length should be more than 10.");
//       return;
//     } else {
//       setPasswordError("");
//     }
//     const updatedData = [...userData];
//     updatedData[index] = editedData;
//     localStorage.setItem("user", JSON.stringify(updatedData));
//     setUserData(updatedData);
//     setEditMode(false);
//     setTempEditedData({ ...editedData });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   setTimeout(() => {
//     setAlertType(null);
//   }, 5000);
//   const dataFound = userData.some((item) => item.Name === editedData.Name);

//   return (
//     <>
//       <Box sx={{ display: "flex" }}>
//         <Homepage id={location.state.id} />

//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           {alertType && (
//             <div style={{ marginBottom: "30px", width: "30%" }}>
//               <Alert severity={alertType}>
//                 <AlertTitle>
//                   {alertType === "error" ? "Error" : "Success"}
//                 </AlertTitle>
//                 {alertMessage}
//               </Alert>
//             </div>
//           )}
//           <Button
//             variant="contained"
//             onClick={() =>
//               navigate("/users", { state: { id: location.state.id } })
//             }
//             sx={{
//               margin: "0px 0px 15px 0px",
//               backgroundColor: "#9c27b0",
//               "&:hover": { backgroundColor: "#9c27b0" },
//             }}
//           >
//             Back
//           </Button>

//           {!editMode ? (
//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                 <TableHead>
//                   <TableRow>
//                     <StyledTableCell>ID</StyledTableCell>
//                     {Object.keys(location.state.item)
//                       .slice(0, 5)
//                       .map((key, index) => (
//                         <StyledTableCell key={index}>
//                           {key.toUpperCase()}
//                         </StyledTableCell>
//                       ))}
//                     <StyledTableCell>ACTION</StyledTableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {dataFound ? (
//                     <StyledTableRow>
//                       <StyledTableCell>{index + 1}</StyledTableCell>
//                       <StyledTableCell>{editedData.Name}</StyledTableCell>
//                       <StyledTableCell>{editedData.Email}</StyledTableCell>
//                       <StyledTableCell>{editedData.Password}</StyledTableCell>
//                       <StyledTableCell>{editedData.PhoneNo}</StyledTableCell>
//                       <StyledTableCell>{editedData.Gender}</StyledTableCell>
//                       <StyledTableCell>
//                         <Stack direction="row" spacing={2}>
//                           <Button
//                             variant="contained"
//                             sx={{
//                               backgroundColor: "#9c27b0",
//                               "&:hover": { backgroundColor: "#9c27b0" },
//                             }}
//                             onClick={() => handleDelete(index)}
//                           >
//                             Delete
//                           </Button>
//                           <Button
//                             variant="contained"
//                             sx={{
//                               backgroundColor: "#9c27b0",
//                               "&:hover": { backgroundColor: "#9c27b0" },
//                             }}
//                             onClick={() => handleEdit(index)}
//                           >
//                             Edit
//                           </Button>
//                         </Stack>
//                       </StyledTableCell>
//                     </StyledTableRow>
//                   ) : (
//                     <TableRow>
//                       <TableCell
//                         colSpan={Object.keys(location.state.item).length + 2}
//                       >
//                         <div style={{ padding: "20px" }}>NO DATA FOUND</div>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           ) : (
//             <Box>
//               <TextField
//                 sx={{ margin: "0px 10px 10px 0px" }}
//                 name="Name"
//                 label="Name"
//                 value={editedData.Name}
//                 autoComplete="off"
//                 onChange={handleChange}
//               />
//               <TextField
//                 name="Email"
//                 sx={{ margin: "0px 10px 10px 0px" }}
//                 label="Email"
//                 autoComplete="off"
//                 value={editedData.Email}
//                 onChange={handleChange}
//               />
//               {emailError && (
//                 <div
//                   style={{ color: "red", fontSize: "1.1em", marginTop: "5px" }}
//                 >
//                   {emailError}
//                 </div>
//               )}
//               <TextField
//                 name="Password"
//                 label="Password"
//                 autoComplete="off"
//                 sx={{ margin: "0px 10px 10px 0px" }}
//                 value={editedData.Password}
//                 onChange={handleChange}
//               />
//               {passwordError && (
//                 <div
//                   style={{ color: "red", fontSize: "1.1em", marginTop: "5px" }}
//                 >
//                   {passwordError}
//                 </div>
//               )}
//               <TextField
//                 name="PhoneNo"
//                 label="Phone Number"
//                 autoComplete="off"
//                 sx={{ margin: "0px 10px 10px 0px" }}
//                 value={editedData.PhoneNo}
//                 onChange={handleChange}
//               />
//               {phoneError && (
//                 <div
//                   style={{ color: "red", fontSize: "1.1em", marginTop: "5px" }}
//                 >
//                   {phoneError}
//                 </div>
//               )}
//               <TextField
//                 name="Gender"
//                 autoComplete="off"
//                 label="Gender"
//                 sx={{ margin: "0px 10px 10px 0px" }}
//                 value={editedData.Gender}
//                 onChange={handleChange}
//               />
//               <Button
//                 variant="contained"
//                 onClick={handleSave}
//                 sx={{
//                   margin: "5px 10px 5px 5px",
//                   backgroundColor: "#9c27b0",
//                   "&:hover": {
//                     backgroundColor: "#9c27b0",
//                   },
//                 }}
//               >
//                 Save
//               </Button>
//               <Button
//                 variant="contained"
//                 onClick={handleCancelEdit}
//                 sx={{
//                   margin: "5px 10px 5px 5px",
//                   backgroundColor: "#9c27b0",
//                   "&:hover": {
//                     backgroundColor: "#9c27b0",
//                   },
//                 }}
//               >
//                 Cancel
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Detailed;

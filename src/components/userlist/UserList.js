import React, { useEffect, useState, lazy, Suspense, useCallback } from "react";
// import Homepage from "../homepage/Homepage";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import {
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  IconButton,
  styled,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Pagination,
  DialogTitle,
  AlertTitle,
  TableSortLabel,
  Alert,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addusers,
  deleteusers,
  editusers,
  SearchUser,
  Userlist,
} from "../redux/actioncreator";
import { debounce, set } from "lodash";
import CloseIcon from "@mui/icons-material/Close";
import { getusers } from "../redux/action";
import PhoneInput from "react-phone-input-2";
const Homepage = lazy(() => import("../homepage/Homepage"));
const StyledH1 = styled("h1")({
  position: "relative",
  color: "#080808",
  fontWeight: "bolder",
  textAlign: "center",
  transition: "all 0.4s ease 0s",
  textTransform: "uppercase",
  "&:before": {
    width: "28px",
    height: "5px",
    display: "block",
    content: '""',
    position: "absolute",
    bottom: "3px",
    left: "50%",
    marginLeft: "-14px",
    backgroundColor: "#b80000",
  },

  "&:after": {
    width: "100px",
    height: "1px",
    display: "block",
    content: '""',
    position: "relative",
    marginTop: "15px",
    left: "50%",
    marginLeft: "-50px",
    backgroundColor: "#b80000",
    marginBottom: "20px",
  },
});
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    overflowY: "hidden",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    overflowY: "hidden",
  },
}));

const UserList = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [phoneno, setPhoneno] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [errorData, setErrorData] = useState({
    firstName: "",
    lastName: "",

    email: "",
  });
  const [TextFieldData, setTextFieldData] = useState({
    firstName: "",
    lastName: "",

    email: "",
  });
  const [alertType, setAlertType] = useState(null);
  // console.log(alertType);
  const [alertMessage, setAlertMessage] = useState("");
  // console.log(alertMessage);
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Add user");
  // const [userList, setUserList] = useState();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const data = useSelector((state) => state.userslist.users);
  // console.log(data);
  const paginationdata = useSelector((state) => state.userslist);
  let limit = 10;

  // console.log(paginationdata);
  const FetchUserList = async (
    page = 1,
    sortBy = "firstName",
    order = "asc"
  ) => {
    const skip = (page - 1) * limit;
    await dispatch(Userlist(limit, skip, sortBy, order));
  };
  useEffect(() => {
    FetchUserList(currentPage, orderBy, order);
  }, [currentPage, orderBy, order]);

  //   console.log(userList);
  // const FetchUserList = async () => {
  //   // console.log("woww");
  //   const response = await axios.get(
  //     "https://jsonplaceholder.typicode.com/users"
  //   );
  //   setUserList(response.data);
  // };

  // useEffect(() => {
  //   FetchUserList();
  // }, []);
  // console.log(search);
  const handleDebounce = useCallback(
    debounce(async (value) => {
      // console.log(value);
      await dispatch(SearchUser(value));
    }, 500),
    []
  );
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    handleDebounce.cancel();
    handleDebounce(value);
  };
  const handleClose = () => {
    setOpen(false);
    setTextFieldData({
      firstName: "",
      lastName: "",

      email: "",
    });
    setPhoneno("");
  };
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const deletedata = await dispatch(deleteusers(id));
      if (deletedata) {
        toast.success("User Deleted Successfully");
      } else {
        toast.success("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);

      toast.error("Error deleting user");
    }
  };

  const handleTextField = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setTextFieldData({ ...TextFieldData, [name]: value });
  };
  const handleClickOpen = () => {
    // console.log("running........");
    setDialogTitle("Add User");
    setOpen(true);
  };
  // console.log(TextFieldData);
  const HandleSubmit = async () => {
    if (
      TextFieldData.firstName === "" ||
      TextFieldData.lastName === "" ||
      phoneno === "" ||
      TextFieldData.email === ""
    ) {
      toast.info("Please Fill All The Fields");
      return false;
    }

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        TextFieldData.email
      )
    ) {
      setErrorData((prevState) => ({
        ...prevState,
        email: "Invalid email",
      }));
      return false;
    } else {
      setErrorData((prevState) => ({
        ...prevState,
        email: "",
      }));
    }
    const data = {
      firstName: TextFieldData.firstName,
      lastName: TextFieldData.lastName,
      phone: phoneno,
      email: TextFieldData.email,
    };
    // console.log(data);
    if (dialogTitle === "Add User") {
      const add = await dispatch(addusers(data));
      // console.log(add);
      if (add) {
        toast.success("User Added Successfully");
        setOpen(false);

        setTextFieldData({
          firstName: "",
          lastName: "",

          email: "",
        });
        setPhoneno("");
      }
    } else if (dialogTitle === "Edit User") {
      const edit = await dispatch(editusers(selectedId, data));
      if (edit) {
        toast.success("User Edited Successfully");
        setOpen(false);
        setTextFieldData({
          firstName: "",
          lastName: "",

          email: "",
        });
        setPhoneno("");
      }
    }
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    const user = data.find((user) => user.id === id);
    // console.log(user);
    setTextFieldData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    setPhoneno(user.phone);
    setSelectedId(id);
    setDialogTitle("Edit User");
    setOpen(true);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    FetchUserList(currentPage, property, isAsc ? "desc" : "asc");
  };
  return (
    <>
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
          <div className="one">
            <StyledH1
              className="text-3xl"
              style={{
                color: "#080808",
                fontWeight: "bolder",
                textAlign: "center",
                position: "relative",
                WebkitTransition: "all 0.4s ease 0s",
                otransition: "all 0.4s ease 0s",
                transition: "all 0.4s ease 0s",
              }}
            >
              USERS LIST
            </StyledH1>
          </div>

          <div className="flex justify-between items-center">
            <TextField
              className="mt-5 mr-0 mb-2 ml-0 w-auto h-auto"
              name="search"
              autoComplete="off"
              placeholder="Search Users"
              value={search}
              onChange={handleSearch}
            />
            <Button
              onClick={() => handleClickOpen()}
              variant="contained"
              sx={{
                backgroundColor: "#9c27b0",
                "&:hover": { backgroundColor: "#9c27b0" },
              }}
            >
              Add User{" "}
            </Button>
          </div>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle
              sx={{ m: 0, p: 2 }}
              className="m-0 p-2"
              id="customized-dialog-title"
            >
              {dialogTitle}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <TextField
                sx={{ margin: "0px 10px 10px 0px", width: "100%" }}
                name="firstName"
                placeholder=" FirstName"
                autoComplete="off"
                value={TextFieldData.firstName}
                onChange={(e) => handleTextField(e)}
              />
              {errorData.firstName && (
                <div
                  style={{ color: "red", fontSize: "1.1em", marginTop: "5px" }}
                >
                  {errorData.firstName}
                </div>
              )}
              <TextField
                sx={{ margin: "0px 10px 10px 0px", width: "100%" }}
                name="lastName"
                placeholder=" LastName"
                autoComplete="off"
                value={TextFieldData.lastName}
                onChange={(e) => handleTextField(e)}
              />
              {errorData.lastName && (
                <div
                  style={{ color: "red", fontSize: "1.1em", marginTop: "5px" }}
                >
                  {errorData.lastName}
                </div>
              )}
              <div style={{ marginBottom: "10px" }}>
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
                sx={{ margin: "0px 10px 10px 0px", width: "100%" }}
                name="email"
                placeholder=" Email"
                autoComplete="off"
                value={TextFieldData.email}
                onChange={(e) => handleTextField(e)}
              />
              {errorData.email && (
                <div
                  style={{ color: "red", fontSize: "1.1em", marginTop: "5px" }}
                >
                  {errorData.email}
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                autoFocus
                onClick={handleClose}
                sx={{
                  margin: "0px 0px 15px 0px",
                  backgroundColor: "#9c27b0",
                  "&:hover": { backgroundColor: "#9c27b0" },
                }}
              >
                Cancel
              </Button>
              <Button
                autoFocus
                variant="contained"
                onClick={() => HandleSubmit()}
                sx={{
                  margin: "0px 0px 15px 0px",
                  backgroundColor: "#9c27b0",
                  "&:hover": { backgroundColor: "#9c27b0" },
                }}
              >
                Save
              </Button>
            </DialogActions>
          </BootstrapDialog>
          <TableContainer component={Paper} className="mt-7">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell className="text-black">ID</TableCell>
                  <TableCell className="text-white">
                    {orderBy === "firstName" ? (
                      <TableSortLabel
                        active={true}
                        direction={order}
                        onClick={(e) => handleRequestSort(e, "firstName")}
                      >
                        NAME
                      </TableSortLabel>
                    ) : (
                      <span
                        onClick={(e) => handleRequestSort(e, "firstName")}
                        className="text-black cursor-pointer"
                      >
                        NAME
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-black">Email</TableCell>
                  <TableCell className="text-black">PhoneNo</TableCell>
                  <TableCell className="text-black">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:hover": { backgroundColor: "#e5e7eb" },
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate("/userlist/detail", {
                          state: {
                            userid: row.id,
                            id: location.state.id,
                          },
                        })
                      }
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        {row.firstName + " " + row.lastName}
                      </TableCell>

                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2}>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#9c27b0",
                              "&:hover": { backgroundColor: "#9c27b0" },
                            }}
                            onClick={(e) => handleDelete(e, row.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#9c27b0",
                              "&:hover": { backgroundColor: "#9c27b0" },
                            }}
                            onClick={(e) => handleEdit(e, row.id)}
                          >
                            Edit
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2} className="mt-9">
            <Pagination
              variant="outlined"
              shape="rounded"
              count={Math.ceil(paginationdata.total / limit || 0)}
              defaultPage={currentPage}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default UserList;

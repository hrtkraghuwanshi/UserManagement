import React, {
  useState,
  useEffect,
  useMemo,
  lazy,
  Suspense,
  Fragment,
} from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Button,
  TextField,
  IconButton,
  styled,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  AlertTitle,
  Stack,
  Alert,
  InputAdornment,
  Switch,
} from "@mui/material";
import { debounce } from "lodash";
import { v4 as uuidv4 } from "uuid";
// import Homepage from "../homepage/Homepage";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import PhoneInput from "react-phone-input-2";
const Homepage = lazy(() => import("../homepage/Homepage"));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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
const handleSearchDebounced = debounce(
  (value, mappedContacts, setFilteredData) => {
    // console.log(value);
    const lowercasedFilter = value.toLowerCase();
    const filteredData = mappedContacts.filter(
      (item) =>
        item.FirstName.toLowerCase().includes(lowercasedFilter) ||
        item.LastName.toLowerCase().includes(lowercasedFilter) ||
        item.Email.toLowerCase().includes(lowercasedFilter)
    );
    // console.log(filteredData);
    setFilteredData(filteredData);
  },
  500
);
const Users = () => {
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletedialogtitle, setDeleteDialogTitle] = useState("Delete Contact");
  const [TextFieldData, setTextFieldData] = useState({
    FirstName: "",
    LastName: "",
    Mobile: "",
    Email: "",
    search: "",
  });
  // console.log(TextFieldData);
  const [errorData, setErrorData] = useState({
    FirstName: "",
    LastName: "",
    Mobile: "",
    Email: "",
  });
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [userData, setUserData] = useState([]);
  const [dialogTitle, setDialogTitle] = useState("Add Contact");
  // const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  // const navigate = useNavigate();
  // console.log(dialogTitle);
  const location = useLocation();
  // console.log(location);
  // console.log(userData);

  // const FilterContact = userData.filter(
  //   (item) => item.id === (location.state ? location.state.id : null)
  // );

  // console.log(filtercontactlength>0);
  // const mappedContacts = mapcontact[0]?.contacts || [];
  const FilterContact = useMemo(
    () =>
      userData.filter(
        (item) => item.id === (location.state ? location.state.id : null)
      ),
    [userData, location.state]
  );
  const mappedContacts = useMemo(
    () => FilterContact[0]?.contacts || [],
    [FilterContact]
  );
  const mapcontact = useMemo(
    () => FilterContact.map((item) => item || []),
    [FilterContact]
  );
  const insidemap = mappedContacts.map((item, index) => item);
  // console.log(insidemap.map((item) => item.FirstName));
  // console.log(insidemap?.map((item)=>item));
  useEffect(() => {
    if (TextFieldData.search === "") {
      setFilteredData(mappedContacts);
    } else {
      const lowercasedFilter = TextFieldData?.search?.toLowerCase();
      const filteredData = mappedContacts.filter((item) => {
        return (
          item.FirstName.toLowerCase().includes(lowercasedFilter) ||
          item.LastName.toLowerCase().includes(lowercasedFilter) ||
          item.Email.toLowerCase().includes(lowercasedFilter)
        );
      });
      setFilteredData(filteredData);
    }
  }, [TextFieldData.search, mapcontact]);

  const handleSearch = (e) => {
    // console.log("running........");
    const { value } = e.target;
    setTextFieldData({ ...TextFieldData, search: value });
    handleSearchDebounced.cancel();
    handleSearchDebounced(value, mappedContacts, setFilteredData);
  };
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("user")) || [];

    setUserData(storedUsers);
    setFilteredData(storedUsers);
  }, []);
  const handleClickOpen = () => {
    // console.log("running........");
    setDialogTitle("Add Contact");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTextFieldData({
      FirstName: "",
      LastName: "",
      Mobile: "",
      Email: "",
      search: "",
    });
  };
  const handleTextField = (e) => {
    const { name, value } = e.target;
    setTextFieldData({ ...TextFieldData, [name]: value });
  };

  const HandleSubmit = () => {
    if (
      TextFieldData.FirstName === "" ||
      TextFieldData.LastName === "" ||
      TextFieldData.Mobile === "" ||
      TextFieldData.Email === ""
    ) {
      toast.info("Please Fill All The Fields");
      return false;
    }

    if (!/^\d{10}$/.test(TextFieldData.Mobile)) {
      setErrorData((prevState) => ({
        ...prevState,
        Mobile: "Phone number must be 10 digits.",
      }));
      return false;
    } else {
      setErrorData((prevState) => ({
        ...prevState,
        Mobile: "",
      }));
    }

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        TextFieldData.Email
      )
    ) {
      setErrorData((prevState) => ({
        ...prevState,
        Email: "Invalid Email",
      }));
      return false;
    } else {
      setErrorData((prevState) => ({
        ...prevState,
        Email: "",
      }));
    }

    const payload = {
      id: uuidv4(),
      FirstName: TextFieldData.FirstName,
      LastName: TextFieldData.LastName,
      Email: TextFieldData.Email,
      PhoneNo: TextFieldData.Mobile,
    };

    if (dialogTitle === "Add Contact") {
      const updatedUserData = userData.map((user) => {
        // console.log(user);
        if (user.id === location.state.id) {
          return {
            ...user,
            contacts:
              user?.contacts?.length > 0
                ? [...user.contacts, payload]
                : [payload],
          };
        }
        return user;
      });

      setUserData(updatedUserData);
      localStorage.setItem("user", JSON.stringify(updatedUserData));

      toast.success("Contact Added Successfully");
      setOpen(false);
      setTextFieldData({
        FirstName: "",
        LastName: "",
        Mobile: "",
        Email: "",
        search: "",
      });
    } else if (dialogTitle === "Edit Contact") {
      const updatedUserData = userData.map((user) => {
        if (user.id === location.state.id) {
          const updatedContacts = user.contacts.map((contact, index) => {
            if (contact.id === TextFieldData.id) {
              return payload;
            }
            return contact;
          });

          return {
            ...user,
            contacts: updatedContacts,
          };
        }
        return user;
      });

      setUserData(updatedUserData);
      localStorage.setItem("user", JSON.stringify(updatedUserData));

      toast.success("Contact Edited Successfully");
      setOpen(false);
      setTextFieldData({
        FirstName: "",
        LastName: "",
        Mobile: "",
        Email: "",
        search: "",
      });
    }
  };

  const handleDelete = (index) => {
    setOpenDeleteDialog(true);
    setDialogTitle(deletedialogtitle);
    // console.log("running........");
    const updatedUserData = userData.map((user) => {
      if (user.id === location.state.id) {
        return {
          ...user,
          contacts: user.contacts.filter((item, ind) => ind !== index),
        };
      }
      return user;
    });

    setUserData(updatedUserData);
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    toast.success("Contact Deleted Successfully");
    setOpenDeleteDialog(false);
  };

  const handleEdit = (index) => {
    // console.log("runnnig...");
    const selectedContact = insidemap[index];
    // console.log(selectedContact);
    setDialogTitle("Edit Contact");
    setOpen(true);
    setTextFieldData({
      id: selectedContact.id,
      FirstName: selectedContact.FirstName,
      LastName: selectedContact.LastName,
      Mobile: selectedContact.PhoneNo,
      Email: selectedContact.Email,
      search: "",
    });
  };
  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      setAlertType(null);
    }, 1000);

    return () => {
      clearTimeout(alertTimeout);
    };
  }, [alertType]);
  const HandleCancel = () => {
    setTextFieldData({ search: "" });
  };
  const handlecloseconfirm = () => {
    setOpenDeleteDialog(false);
  };

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <>
      <Box className="flex">
        <Suspense fallback={<div>Loading...</div>}>
          <Homepage id={location?.state?.id} />
        </Suspense>

        <Box component="main" className="p-3 grow h-14">
            <ToastContainer
              pauseOnHover={false}
              pauseOnFocusLoss={false}
              autoClose={2000}
              transition={Bounce}
              position="top-right"
            />
          <Switch defaultChecked onChange={(e) => handleChecked(e)} />
          {checked ? (
            <Button
              onClick={() => handleClickOpen()}
              variant="contained"
              sx={{
                backgroundColor: "#9c27b0",
                "&:hover": { backgroundColor: "#9c27b0" },
              }}
            >
              Add Contact{" "}
            </Button>
          ) : null}
          <TextField
            sx={{ margin: "0px 0px 0px 10px", width: "20%" }}
            name="search"
            size="small"
            autoComplete="off"
            placeholder="Search Contact"
            value={TextFieldData.search}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <CloseIcon
                    onClick={() => HandleCancel()}
                    sx={{ cursor: "pointer" }}
                  />
                </InputAdornment>
              ),
            }}
          />

          {/* <h1
            style={{ color: "black", fontWeight: "bolder", textAlign: "left" }}
          >
            UserList:-
          </h1> */}

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
                name="FirstName"
                placeholder="First Name"
                autoComplete="off"
                value={TextFieldData.FirstName}
                onChange={(e) => handleTextField(e)}
              />
              {errorData.FirstName && (
                <div
                  style={{ color: "red", fontSize: "1.1em", marginTop: "5px" }}
                >
                  {errorData.FirstName}
                </div>
              )}
              <TextField
                sx={{ margin: "0px 10px 10px 0px", width: "100%" }}
                name="LastName"
                placeholder="Last Name "
                value={TextFieldData.LastName}
                autoComplete="off"
                onChange={(e) => handleTextField(e)}
              />
              {errorData.LastName && (
                <div
                  style={{ color: "red", fontSize: "1.1em", marginTop: "5px" }}
                >
                  {errorData.LastName}
                </div>
              )}

              <TextField
                sx={{ margin: "0px 10px 10px 0px", width: "100%" }}
                name="Mobile"
                placeholder="Mobile"
                value={TextFieldData.Mobile}
                autoComplete="off"
                onChange={(e) => handleTextField(e)}
              />
              {errorData.Mobile && (
                <div
                  style={{ color: "red", fontSize: "1.1em", marginTop: "5px" }}
                >
                  {errorData.Mobile}
                </div>
              )}
              <TextField
                sx={{ margin: "0px 10px 10px 0px", width: "100%" }}
                name="Email"
                placeholder="Email"
                value={TextFieldData.Email}
                autoComplete="off"
                onChange={(e) => handleTextField(e)}
              />
              {errorData.Email && (
                <div
                  style={{ color: "red", fontSize: "1.1em", marginTop: "5px" }}
                >
                  {errorData.Email}
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

          {/* <TableContainer component={Paper} className="main_table">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead sx={{ backgroundColor: "black" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Email</TableCell>
                  <TableCell sx={{ color: "white" }}>PhoneNo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData && userData.length > 0 ? (
                  userData.map((item, index) => {
                    // console.log(item);
                    // console.log(index);
                    return (
                      <TableRow
                        key={index}
                        onClick={() =>
                          navigate("/users/detailed", {
                            state: {
                              item,
                              index,
                              id: location.state.id,
                            },
                          })
                        }
                      >
                        <TableCell>{item.Name}</TableCell>
                        <TableCell>{item.Email}</TableCell>
                        <TableCell>{item.PhoneNo}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <div style={{ padding: "20px" }}>NO DATA FOUND</div>
                )}
              </TableBody>
            </Table>
          </TableContainer> */}
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
              Contact List
            </StyledH1>
          </div>
          <TableContainer component={Paper} className="main_table">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead sx={{ backgroundColor: "black" }}>
                <TableRow>
                  <TableCell className="text-white">FirstName</TableCell>
                  <TableCell className="text-white">LastName</TableCell>
                  <TableCell className="text-white">Email</TableCell>
                  <TableCell className="text-white">PhoneNo</TableCell>
                  <TableCell className="text-white">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData && filteredData.length > 0 ? (
                  filteredData.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <Dialog
                          onClose={handlecloseconfirm}
                          aria-labelledby="customized-dialog-title"
                          open={openDeleteDialog}
                        >
                          {" "}
                          <DialogTitle
                            sx={{ m: 0, p: 2 }}
                            className="m-0 p-2"
                            id="customized-dialog-title"
                          >
                            {deletedialogtitle}
                          </DialogTitle>
                          <DialogContent id="alert-dialog-description">
                            Are You sure You Want to Delete this Contact?
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={handlecloseconfirm}
                              autoFocus
                              variant="contained"
                              sx={{
                                margin: "0px 0px 15px 0px",
                                backgroundColor: "#9c27b0",
                                "&:hover": { backgroundColor: "#9c27b0" },
                              }}
                            >
                              Disagree
                            </Button>
                            <Button
                              onClick={() => handleDelete(index)}
                              autoFocus
                              variant="contained"
                              sx={{
                                margin: "0px 0px 15px 0px",
                                backgroundColor: "#9c27b0",
                                "&:hover": { backgroundColor: "#9c27b0" },
                              }}
                            >
                              Agree
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <TableRow
                          key={index}
                          sx={{ "&:hover": { backgroundColor: "#e5e7eb" } }}
                        >
                          <TableCell>{item.FirstName}</TableCell>
                          <TableCell>{item.LastName}</TableCell>
                          <TableCell>{item.Email}</TableCell>
                          <TableCell>{item.PhoneNo}</TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={2}>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#9c27b0",
                                  "&:hover": { backgroundColor: "#9c27b0" },
                                }}
                                onClick={() => setOpenDeleteDialog(true)}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#9c27b0",
                                  "&:hover": { backgroundColor: "#9c27b0" },
                                }}
                                onClick={() => handleEdit(index)}
                              >
                                Edit
                              </Button>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="p-6">
                      NO DATA FOUND
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default Users;

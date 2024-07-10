import React, { useEffect, useState, lazy, Suspense } from "react";
// import Homepage from "../homepage/Homepage";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  styled,
  Box,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Userlist } from "../redux/actioncreator";
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

const UserList = () => {
  const dipatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [userList, setUserList] = useState();

  const data = useSelector((state) => state.userslist);
  // console.log(data);
  const FetchUserList = async () => {
    await dipatch(Userlist());
  };
  useEffect(() => {
    FetchUserList();
  }, []);
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
  return (
    <>
      <Box className="flex">
        <Suspense fallback={<div>Loading...</div>}>
          <Homepage id={location?.state?.id} />
        </Suspense>
        <Box component="main" className="p-3 grow h-16">
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead sx={{ backgroundColor: "black" }}>
                <TableRow>
                  <TableCell className="text-white">ID</TableCell>
                  <TableCell className="text-white">NAME</TableCell>
                  <TableCell className="text-white">Email</TableCell>
                  <TableCell className="text-white">PhoneNo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data && data.length > 0 ? (
                  data.map((user, index) => (
                    <TableRow
                      key={user.id}
                      sx={{
                        "&:hover": { backgroundColor: "#e5e7eb" },
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate("/userlist/detail", {
                          state: {
                            userid: user.id,
                            id: location.state.id,
                          },
                        })
                      }
                    >
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="p-6">
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

export default UserList;

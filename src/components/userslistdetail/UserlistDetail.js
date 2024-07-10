import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
  memo,
  useMemo,
} from "react";
import { Box, Grid, Typography, styled } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
// import Homepage from "../homepage/Homepage";
import "./userdetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../redux/actioncreator";
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
const UserlistDetail = () => {
  const dipatch = useDispatch();
  const location = useLocation();
  // const [detail, setDetail] = useState();

  const detail = useSelector((state) => state.user);
  // console.log(detail);
  const FetchDetailData = async () => {
    await dipatch(User(location.state.userid));
  };
  useEffect(() => {
    FetchDetailData();
  }, [location.state.userid]);
  // console.log(detail);
  // const fetchUserDetail = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://jsonplaceholder.typicode.com/users/${location.state.userid}`
  //     );
  //     setDetail(response.data);
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //     setDetail(null);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserDetail();
  // }, [location.state.userid]);

  const address =
    detail && detail.length > 0
      ? `${detail.address.street}, ${detail.address.city}, ${detail.address.zipcode}, ${detail.address.suite}`
      : "Address information not available";

  return (
    <Box display="flex">
      <Suspense fallback={<div>Loading...</div>}>
        <Homepage id={location?.state?.id} />
      </Suspense>
      <Box component="main" p={3} flexGrow={1}>
        <div className="one">
          <StyledH1
            className="text-5xl"
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
            Users List
          </StyledH1>
        </div>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            {detail ? (
              <div className="user-details-container">
                <div className="user-detail-row">
                  <Typography variant="subtitle1" className="font-bold">
                    User Name:
                  </Typography>
                  <Typography variant="body1">{detail.username}</Typography>
                </div>
                <div className="user-detail-row">
                  <Typography variant="subtitle1" className="font-bold">
                    Website:
                  </Typography>
                  <Typography variant="body1">{detail.website}</Typography>
                </div>
                <div className="user-detail-row">
                  <Typography variant="subtitle1" className="font-bold">
                    Address:
                  </Typography>
                  <Typography variant="body1">{address}</Typography>
                </div>
                <div className="user-detail-row">
                  <Typography variant="subtitle1" className="font-bold">
                    Company Name:
                  </Typography>
                  <Typography variant="body1">
                    {detail?.company?.name}
                  </Typography>
                </div>
                <div className="user-detail-row">
                  <Typography variant="subtitle1" className="font-bold">
                    Company Bs:
                  </Typography>
                  <Typography variant="body1">detail.company.bs</Typography>
                </div>
                <div className="user-detail-row">
                  <Typography variant="subtitle1" className="font-bold">
                    Company catchPhrase:
                  </Typography>
                  <Typography variant="body1">
                    {detail?.company?.catchPhrase}
                  </Typography>
                </div>
              </div>
            ) : (
              <Typography variant="body1" align="center" color="error">
                No Data Found
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default memo(UserlistDetail);

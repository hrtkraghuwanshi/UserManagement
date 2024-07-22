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

  const address = detail 
    ? `${detail?.address?.address}, ${detail?.address?.city}, ${detail?.address?.postalCode}, ${detail?.address?.state}`
    : "Address information not available";
  const companyaddress = detail 
    ? `${detail?.company?.address?.address}, ${detail?.company?.address?.city}, ${detail?.company?.address?.postalCode}, ${detail?.company?.address?.state}`
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
            Users DetailS
          </StyledH1>
        </div>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6} lg={6}>
            <div>
              <img alt={detail.image} src={detail.image} className="w-full"/>
            </div>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={6}>
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
                    Maiden Name:
                  </Typography>
                  <Typography variant="body1">{detail.maidenName}</Typography>
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
                    Company Address:
                  </Typography>
                  <Typography variant="body1">{companyaddress}</Typography>
                </div>
                <div className="user-detail-row">
                  <Typography variant="subtitle1" className="font-bold">
                    Age:
                  </Typography>
                  <Typography variant="body1">{detail.age}</Typography>
                </div>
                <div className="user-detail-row">
                  <Typography variant="subtitle1" className="font-bold">
                    Blood Group:
                  </Typography>
                  <Typography variant="body1">{detail.bloodGroup}</Typography>
                </div>
                <div className="user-detail-row">
                  <Typography variant="subtitle1" className="font-bold">
                    Weight:
                  </Typography>
                  <Typography variant="body1">{detail.weight}</Typography>
                </div>
                <div className="user-detail-row">
                  <Typography variant="subtitle1" className="font-bold">
                    Birth Date:
                  </Typography>
                  <Typography variant="body1">{detail.birthDate}</Typography>
                </div>
                <div className="user-detail-row">
                  <Typography variant="subtitle1" className="font-bold">
                    Gender:
                  </Typography>
                  <Typography variant="body1">{detail.gender}</Typography>
                </div>
                <div className="user-detail-row">
                  <Typography variant="subtitle1" className="font-bold">
                    University:
                  </Typography>
                  <Typography variant="body1">{detail.university}</Typography>
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

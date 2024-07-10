import React, { lazy, Suspense } from "react";
import { Grid, Card, Box, CardContent, Stack, Typography } from "@mui/material";
// import Homepage from "../homepage/Homepage";
import { useLocation } from "react-router-dom";
const Homepage = lazy(() => import("../homepage/Homepage"));
const Dashboard = () => {
  const location = useLocation();

  // console.log("das",location.state.id);
  // console.log(location.state.filterEmail[0]);
  const data = JSON.parse(localStorage.getItem("user")) || [];
  // console.log(data);

  return (
    <>
      <Box className="flex">
        <Suspense fallback={<div>Loading...</div>}>
          <Homepage id={location?.state?.id} />
        </Suspense>
        <Box component="main" className="p-3 grow h-16">
          <Grid
            container
            wrap="nowrap"
            className="flex flex-col md:flex-row mt-0 space-x-2 justify-start"
          >
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card>
                <CardContent className="text-white bg-gradient-to-r from-purple-500 to-pink-500">
                  <Stack direction="row" spacing={2}>
                    <Typography variant={"h6"} gutterBottom>
                      <span
                        className="text-5xl font-extrabold selection:bg-black"
                        // style={{ fontSize: "50px", fontWeight: "bolder  " }}
                      >
                        {data.length}
                      </span>
                      <div className="font-bold selection:bg-black">Total Users</div>
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;

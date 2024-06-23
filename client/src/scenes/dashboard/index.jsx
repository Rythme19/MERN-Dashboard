import React from "react";
import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import TempLineChart from "../../components/TempLineChart";
import TempBarChart from "../../components/TempBarChart";
import PressLineChart from "../../components/PressLineChart";
import PressBarChart from "../../components/PressBarChart";
import Realtime from "../realtime/index";

const Dashboard = () => {
  return (
    <Box m="20px" maxWidth="1400px">
      <Header title="Dashboard" subtitle="Welcome To Your Dashboard" />
      <Realtime showHeader={false} /> {/* Use Realtime component without Header */}
      <Box mt={2} display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column" flex={1} mr={1}>
          <Box height="20vh">
            <TempLineChart />
          </Box>
          <Box height="20vh" mt={1}>
            <TempBarChart />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" flex={1} ml={1}>
          <Box height="20vh">
            <PressLineChart />
          </Box>
          <Box height="20vh" mt={1}>
            <PressBarChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

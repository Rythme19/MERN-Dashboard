import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/TempBarChart";
import BarChart2 from "../../components/PressBarChart";
const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Temperature & Pressure" />
      <Box height="40vh">
        <BarChart />
      </Box>
      <Box height="40vh">
        <BarChart2 />
      </Box>
    </Box>
    
  );
};

export default Bar;
/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../../components/Header";
import { Box, useTheme, Typography } from "@mui/material";
import GaugeChart from "react-gauge-chart";
import { tokens } from "../../theme";
import { observer } from "mobx-react";
import dataModel from "model/DataModel";

const Realtime = observer(({ showHeader = true }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const colors = tokens(theme.palette.mode);

  React.useEffect(() => {
    dataModel.fetchRealtimeData();
  }, []);

  // Dynamically calculate colors based on temperature value
  const calculateTempColors = () => {
    const { temperature } = dataModel.realtimeData;
    let gaugeColors = [];

    if (temperature <= 8) {
      gaugeColors = ["#00bfff", "#00ff00", "#ff0000"]; // Blue to Green to Red
    } else if (temperature <= 20) {
      gaugeColors = ["#00ff00", "#ffff00", "#ff0000"]; // Green to Yellow to Red
    } else {
      gaugeColors = ["#ffff00", "#ff8000", "#ff0000"]; // Yellow to Orange to Red
    }

    return gaugeColors;
  };

  // Safely get temperature and pressure
  const temperature = parseFloat(dataModel.realtimeData.temperature) || 0;
  const pressure = parseFloat(dataModel.realtimeData.pressure) || 0;

  // Normalizing the large pressure value
  const normalizedPressure = pressure / 200000; // Assuming 200000 is the max value

  // Format time and date
  const formattedDateTime = `${dataModel.realtimeData.time}, ${dataModel.realtimeData.date}`;

  return (
    <Box m="10px">
      {showHeader && <Header title="Realtime" subtitle="Real-time Data Gauges" />}
      <Box
        height="40vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          "& .gauge-container": {
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          },
          "& .gauge-text": {
            color: isDarkMode ? "#ffffff" : "#808080", // White in dark mode, Grey in light mode
            fontWeight: "bold", // Make gauge titles bold
          },
          "& .time-date": {
            fontSize: "14px",
            color: isDarkMode ? "#ffffff" : "#808080", // White in dark mode, Grey in light mode
            marginTop: "8px",
            fontWeight: "bold", // Make time and date bold
            fontFamily: "Arial, sans-serif",
          },
        }}
      >
        <Box className="gauge-container">
          <Box textAlign="center">
            <Typography variant="h6" className="gauge-text">Temperature</Typography>
            <GaugeChart
              id="temperature-gauge"
              nrOfLevels={10}
              percent={isNaN(temperature) ? 0 : temperature / 55}
              textColor={isDarkMode ? "#ffffff" : "#000000"}
              formatTextValue={(value) => `${isNaN(temperature) ? "N/A" : temperature.toFixed(1)} °C`}
              colors={calculateTempColors()}
              arcWidth={0.2}
              needleColor="#808080"
              needleBaseColor="#808080"
            />
            <Typography variant="body2" className="time-date">Last Updated: {formattedDateTime}</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6" className="gauge-text">Pressure</Typography>
            <GaugeChart
              id="pressure-gauge"
              nrOfLevels={30}
              percent={isNaN(normalizedPressure) ? 0 : normalizedPressure}
              textColor={isDarkMode ? "#ffffff" : "#000000"}
              formatTextValue={(value) => `${isNaN(pressure) ? "N/A" : pressure.toFixed(0)}Pa`}
              colors={["#00bfff", "#ff00ff", "#ff0000", "#00ff00"]}
              arcWidth={0.3}
              needleColor="#808080"
              needleBaseColor="#808080"
            />
            <Typography variant="body2" className="time-date">Last Updated: {formattedDateTime}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default Realtime;

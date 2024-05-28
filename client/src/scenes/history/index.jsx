import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fromUnixTime } from "date-fns";

const History = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3001/getData")
      .then((response) => setData(response.data))
      .catch((err) =>
        console.log("There was an error fetching the data!", err)
      );
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "time", headerName: "Time", flex: 1 },
    { field: "temperature", headerName: "Temperature", flex: 1 },
    { field: "pressure", headerName: "Pressure", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="History" subtitle="List Data history" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={data.map((elem) => {
            return {
              ...elem,
              time: fromUnixTime(elem.time).toLocaleString(),
            };
          })}
          columns={columns}
          getRowId={(row) => row._id} // Ensures the correct key is used for each row
        />
      </Box>
    </Box>
  );
};

export default History;

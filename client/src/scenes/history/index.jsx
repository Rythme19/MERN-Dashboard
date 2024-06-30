import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import dataModel from "model/DataModel";
import { observer } from "mobx-react";


const History = observer(() => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  React.useEffect(() => {
    dataModel.fetchData();
    console.log(dataModel.aquastats);
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "time", headerName: "Time ", flex: 1 },
    { field: "temperature", headerName: "Temperature (C°)", flex: 1 },
    { field: "pressure", headerName: "Pressure (Pa)", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="History" subtitle="List Data History" />
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
          rows={dataModel.aquastats}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
});

export default History;

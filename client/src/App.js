import { ColorModeContext, useMode } from "./theme";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import History from "./scenes/history";
//import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Realtime from "./scenes/realtime";
//import Realtime from "./scenes/realtime";
//import Pie from "./scenes/pie";
//import FAQ from "./scenes/faq";
//import Geography from "./scenes/geography";
//import Calendar from "./scenes/calendar";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/team" element={<Team />} />
             
              <Route path="/line" element={<Line />} />
              <Route path="/form" element={<Form />} />
              <Route path="/history" element={<History />} />
              <Route path="/realtime" element={<Realtime />} />
              {/*
              <Route path="/realtime" element={<Realtime />} />
              <Route path="/contacts" element={<Contacts />} />
             <Route path="/pie" element={<Pie />} />
            <Route path="/invoices" element={<Invoices />} />
            
            <Route path="/faq" element={<FAQ />} />
            <Route path="/Geography" element={<Geography />} />
            <Route path="/calendar" element={<Calendar />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

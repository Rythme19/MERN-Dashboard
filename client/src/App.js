import React, { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import History from "./scenes/history";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Realtime from "./scenes/realtime";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import Form from "./scenes/form";
import { AuthProvider, AuthContext } from "./AuthContext";
import { AuthRoute, ProtectedRoute } from "./AuthRoute";


function App() {
  const [theme, colorMode] = useMode();
  const [setData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      console.log("New data received:", newData);
      setData((prevData) => [...prevData, newData]);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <AuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <AuthContext.Consumer>
              {({ isAuthenticated }) => (
                <>
                  {isAuthenticated && <Sidebar />}
                  <main className="content">
                    {isAuthenticated && <Topbar />}
                    <Routes>
                      <Route path="/login" element={<AuthRoute />}>
                        <Route path="/login" element={<Login />} />
                      </Route>
                      <Route path="/" element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                      </Route>
                      <Route path="/team" element={<ProtectedRoute />}>
                        <Route path="/team" element={<Team />} />
                      </Route>
                      <Route path="/history" element={<ProtectedRoute />}>
                        <Route path="/history" element={<History />} />
                      </Route>
                      <Route path="/bar" element={<ProtectedRoute />}>
                        <Route path="/bar" element={<Bar />} />
                      </Route>
                      <Route path="/line" element={<ProtectedRoute />}>
                        <Route path="/line" element={<Line />} />
                      </Route>
                      <Route path="/realtime" element={<ProtectedRoute />}>
                        <Route path="/realtime" element={<Realtime />} />
                      </Route>
                      <Route path="/form" element={<ProtectedRoute />}>
                        <Route path="/form" element={<Form />} />
                      </Route>
                    </Routes>
                  </main>
                </>
              )}
            </AuthContext.Consumer>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default App;
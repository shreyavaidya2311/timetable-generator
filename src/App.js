import React from "react";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;

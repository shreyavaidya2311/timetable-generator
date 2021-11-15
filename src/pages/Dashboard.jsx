import React from "react";
import {
  Box,
  Tabs,
  Tab,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { BackupTable } from "@mui/icons-material";
import theme from "../theme";
import AddCourses from "../components/AddCourses";
import AddConstraints from "../components/AddConstraints";
import ViewTimeTable from "../components/ViewTimeTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <BackupTable />
              </IconButton>
              <Typography variant="h6" color="inherit" component="div">
                Time Table Generator
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Add Courses" />
            <Tab label="Add Constraints" />
            <Tab label="View Time Table" />
          </Tabs>
        </Box>
        <center>
          <TabPanel value={value} index={0}>
            <AddCourses />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AddConstraints />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ViewTimeTable />
          </TabPanel>
        </center>
      </ThemeProvider>
    </>
  );
}

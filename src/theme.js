import { createTheme } from "@mui/material";

var primary = "#3f8bc7";
var secondary = "#363636";

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  typography: {
    fontFamily: ["Lato"],
    fontSize: 16,
  },
});

export default theme;

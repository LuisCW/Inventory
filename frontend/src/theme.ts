import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0B5FFF",
    },
    secondary: {
      main: "#13B57C",
    },
    background: {
      default: "#F5F8FF",
      paper: "#FFFFFF",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: "'IBM Plex Sans', sans-serif",
    h4: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
    },
  },
});

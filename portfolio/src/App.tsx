import ResponsiveAppBar from './ResponsiveAppBar';
import React, { ReactComponentElement } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Routes, { getRoutes } from './Routes';
import { BrowserRouter } from "react-router-dom";
import Locale from './Locale';

const themeLight = createTheme({
  palette: {
    background: {
      default: "#e4f0e2"
    }
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  }
});



function App() {

  const [dark, setDark] = React.useState(true);
  const defaultLanguage: string = Locale();

  return (
    <BrowserRouter>
      <ThemeProvider theme={dark ? themeDark : themeLight}>
        <CssBaseline />
        <ResponsiveAppBar defaultLanguage={defaultLanguage} pages={getRoutes()}></ResponsiveAppBar>
        <Routes />

        {/* <Button onClick={() => setDark((prev) => !prev)}>Toggle Theme</Button> */}
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App

import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./style/global-style";
import { darkTheme, lightTheme } from "./style/theme";
import { useRecoilValue } from "recoil";
import { userTheme } from "./data/atom";
import Router from "./routes/Router";

function App() {
  const theme = useRecoilValue(userTheme);
  const [currTheme, setCurrTheme] = useState(lightTheme);

  useEffect(() => {
    const value = theme ? lightTheme : darkTheme;
    setCurrTheme(value);
  }, [theme]);

  return (
    <ThemeProvider theme={currTheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;

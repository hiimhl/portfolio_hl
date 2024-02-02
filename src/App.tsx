import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./style/global-style";
import { darkTheme, lightTheme } from "./style/theme";
import { useRecoilValue } from "recoil";
import { userTheme } from "./data/atom";
import Header from "./components/Header";
import Home from "./components/Home";

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
      <Header />
      <Home />
    </ThemeProvider>
  );
}

export default App;

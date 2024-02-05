import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  backgroundColor: "#141414",
  fontColor: "#fffffc",
  gray: "#afafaf",
  cardColor: "rgba(255, 255, 255, 0.05)",
  boxShadow: "0px 3px 15px 1px rgba(0, 0, 0, 0.5)",
  gradient: "linear-gradient(0, rgb(10, 76, 105), rgb(20, 20, 20));",
  contact: "linear-gradient(0, rgb(12, 35, 50), rgb(10, 76, 105));",
  btnColor: "#393939",
  logo: "/logo_text.png",
};

export const lightTheme: DefaultTheme = {
  backgroundColor: "#fffffc",
  fontColor: "#121420",
  gray: "#666666",
  cardColor: "rgba(255, 255, 255, 0.7)",
  boxShadow: "0px 3px 15px 1px rgba(0, 0, 0, 0.07)",
  gradient:
    "linear-gradient(0deg, rgba(60, 184, 150, 0.6), rgba(254.75, 255, 254.93, 1));",
  contact: "linear-gradient(0,  rgb(46, 166, 133),rgba(60, 184, 150, 0.6));",
  btnColor: "#D5D5D5",
  logo: "/logo_text_black.png",
};

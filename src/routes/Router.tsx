import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "../components/Header";

function Router() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;

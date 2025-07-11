// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Apod from "./components/Media";

const App = () => {
  return (
    <>
      <Header />
      <div style={{ paddingTop: 60 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apod" element={<Apod />} />
          <Route
            path="*"
            element={
              <div style={{ padding: 20, color: "white" }}>
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;

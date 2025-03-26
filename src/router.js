import React from "react";
import { Routes, Route, Navigate  } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import InterviewSelfCheck from "./pages/interview/InterviewSelfCheck.jsx";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/self-check" element={<InterviewSelfCheck />} />
    </Routes>
  );
};

export default RouterConfig;

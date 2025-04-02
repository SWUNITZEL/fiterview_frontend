import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import InterviewSelfCheck from "./pages/interview/InterviewSelfCheck.jsx";
import DocumentSelection from "./pages/document/DocumentSelection.jsx";
import "./pages/document/DocumentSelection.css"; 
import Practice from "./pages/practice/Practice"; 
import InterviewTypeSelection from "./pages/interview/InterviewTypeSelection.jsx";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/self-check" element={<InterviewSelfCheck />} />
      <Route path="/document-selection" element={<DocumentSelection />} /> 
      <Route path="/practice" element={<Practice />} /> 
      <Route path="/interview-type" element={<InterviewTypeSelection />} />
    </Routes>
  );
};

export default RouterConfig;
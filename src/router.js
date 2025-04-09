import React from "react";
import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import Home from './pages/home/Home.jsx';
import Login from "./pages/login/Login.jsx";
import InterviewSelfCheck from "./pages/interview/InterviewSelfCheck.jsx";
import Interview from "./pages/interview/Interview.jsx";
import ReportMain from './pages/resultreport/ReportMain';
import ReportNonverbal from './pages/resultreport/ReportNonverbal';
import ReportDelivery from './pages/resultreport/ReportDelivery';

const RouterConfig = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/self-check" element={<InterviewSelfCheck />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/result" element={<ReportMain />} />
      <Route path="/result/nonverbal" element={<ReportNonverbal />} />
      <Route path="/result/delivery" element={<ReportDelivery />} />
    </ReactRoutes>
  );
};

export default RouterConfig;

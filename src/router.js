import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import InterviewSelfCheck from "./pages/interview/InterviewSelfCheck.jsx";
import DocumentSelection from "./pages/document/DocumentSelection.jsx";
import "./pages/document/DocumentSelection.css";
import Practice from "./pages/practice/Practice";
import InterviewTypeSelection from "./pages/interview/InterviewTypeSelection.jsx";
import Interview from "./pages/interview/Interview.jsx";
import ReportMain from './pages/resultReport/ReportMain';
import ReportNonverbal from './pages/resultReport/ReportNonverbal';
import ReportDelivery from './pages/resultReport/ReportDelivery';
import ReportAnswerAnalysis from './pages/resultReport/ReportAnswerAnalysis';

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
      <Route path="/interview" element={<Interview />} />
      <Route path="/result" element={<ReportMain />} />
      <Route path="/result/nonverbal" element={<ReportNonverbal />} />
      <Route path="/result/delivery" element={<ReportDelivery />} />
      <Route path="/result/analysis-by-an-answer" element={<ReportAnswerAnalysis />} />
    </Routes>
  );
};

export default RouterConfig;

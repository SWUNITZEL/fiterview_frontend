import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import AIMock from "./pages/aiMock/AIMock.jsx";
import PersonaSelection from './pages/selection/PersonaSelection.jsx';
import InterviewConditionSelection from './pages/selection/InterviewConditionSelection.jsx';
import SelfCheck from "./pages/selfCheck/SelfCheck.jsx";
import FaceCheck from "./pages/selfCheck/FaceCheck.jsx";
import SoundCheck from "./pages/selfCheck/SoundCheck.jsx";
import Interview from "./pages/interview/Interview.jsx";
import ReportMain from './pages/resultReport/ReportMain';
import ReportNonverbal from './pages/resultReport/ReportNonverbal';
import ReportDelivery from './pages/resultReport/ReportDelivery';
import ReportAnswerAnalysis from './pages/resultReport/ReportAnswerAnalysis';
import ResultNotice from './pages/preResult/ResultNotice';
import ReportGenerating from './pages/preResult/ReportGenerating';
import InterviewResultSummary from './pages/preResult/InterviewResultSummary';


const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ai-mock" element={<AIMock />} />
      <Route path="/interview" element={<Interview />} />

      <Route path="/self-check" element={<SelfCheck />} />
      <Route path="/self-check/face-check" element={<FaceCheck />} />
      <Route path="/self-check/sound-check" element={<SoundCheck />} />

      <Route path="/result" element={<ReportMain />} />
      <Route path="/result/nonverbal" element={<ReportNonverbal />} />
      <Route path="/result/delivery" element={<ReportDelivery />} />
      <Route path="/result/analysis-by-an-answer" element={<ReportAnswerAnalysis />} />

      <Route path="/result-notice" element={<ResultNotice />} />
      <Route path="/report-generating" element={<ReportGenerating />} />
      <Route path="/interview-summary" element={<InterviewResultSummary />} />

      <Route path="/select-interview-condition/persona" element={<PersonaSelection />} />
      <Route path="/select-interview-condition" element={<InterviewConditionSelection />} />

    </Routes>
  );
};

export default RouterConfig;

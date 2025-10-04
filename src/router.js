// router.js

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Join from "./pages/join/Join.jsx";
import AIMock from "./pages/aiMock/AIMock.jsx";
import InterviewConfig from "./pages/config/InterviewConfig.jsx";
import PersonaConfig from "./pages/config/PersonaConfig.jsx";
import InterviewSessionWrapper from "./pages/interview/InterviewSessionWrapper.jsx";
import ReportMain from "./pages/report/ReportMain.jsx";
import ReportNonverbal from "./pages/report/ReportNonverbal.jsx";
import ReportDelivery from "./pages/report/ReportDelivery.jsx";
import ReportAnswer from "./pages/report/ReportAnswer.jsx";
import ReportCompare from "./pages/report/ReportCompare.jsx";
import ResultNotice from "./pages/preResult/ResultNotice.jsx";
import ReportGenerating from "./pages/preResult/ReportGenerating.jsx";
import { PATH } from "./data/paths";
import AuthCallback from "./pages/join/AuthCallback.jsx";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthCallback />} />
      
      <Route path="/auth/callback" element={<AuthCallback />} /> 
      <Route path={PATH.ROOT} element={<Navigate to={PATH.HOME} />} />
      <Route path={PATH.HOME} element={<Home />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.JOIN} element={<Join />} />
      <Route path={PATH.AI_MOCK} element={<AIMock />} />
      <Route path={PATH.INTERVIEW_ALL} element={<InterviewSessionWrapper />} />
      <Route path={PATH.REPORT} element={<ReportMain />} />
      <Route path={PATH.REPORT_NONVERBAL} element={<ReportNonverbal />} />
      <Route path={PATH.REPORT_DELIVERY} element={<ReportDelivery />} />
      <Route path={PATH.REPORT_ANSWER} element={<ReportAnswer />} />
      <Route path={PATH.REPORT_COMPARE} element={<ReportCompare />} />
      <Route path={PATH.REPORT_NOTICE} element={<ResultNotice />} />
      <Route path={PATH.REPORT_GENERATING} element={<ReportGenerating />} />
      <Route path={PATH.INTERVIEW_CONFIG_PERSONA} element={<PersonaConfig />} />
      <Route path={PATH.INTERVIEW_CONFIG} element={<InterviewConfig />} />
    </Routes>
  );
};

export default RouterConfig;
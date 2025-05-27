import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Join from "./pages/join/Join.jsx"
import AIMock from "./pages/aiMock/AIMock.jsx";

import InterviewConfig from './pages/config/InterviewConfig.jsx';
import PersonaConfig from './pages/config/PersonaConfig.jsx';

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

import { PATH } from './data/paths';

const RouterConfig = () => {
  return (
    <Routes>
      <Route path={PATH.ROOT} element={<Navigate to={PATH.HOME} />} />
      <Route path={PATH.HOME} element={<Home />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.JOIN} element={<Join />} />
      <Route path={PATH.AI_MOCK} element={<AIMock />} />
      <Route path={PATH.INTERVIEW} element={<Interview />} />

      <Route path={PATH.INTERVIEW_SELF_CHECK} element={<SelfCheck />} />
      <Route path={PATH.INTERVIEW_SELF_CHECK_FACE} element={<FaceCheck />} />
      <Route path={PATH.INTERVIEW_SELF_CHECK_SOUND} element={<SoundCheck />} />

      <Route path={PATH.RESULT} element={<ReportMain />} />
      <Route path={PATH.RESULT_NONVERBAL} element={<ReportNonverbal />} />
      <Route path={PATH.RESULT_DELIVERY} element={<ReportDelivery />} />
      <Route path={PATH.RESULT_ANALYSIS_BY_ANSWER} element={<ReportAnswerAnalysis />} />

      <Route path={PATH.RESULT_NOTICE} element={<ResultNotice />} />
      <Route path={PATH.REPORT_GENERATING} element={<ReportGenerating />} />
      <Route path={PATH.INTERVIEW_SUMMARY} element={<InterviewResultSummary />} />

      <Route path={PATH.INTERVIEW_CONFIG_PERSONA} element={<PersonaConfig />} />
      <Route path={PATH.INTERVIEW_CONFIG} element={<InterviewConfig />} />
    </Routes>
  );
};

export default RouterConfig;

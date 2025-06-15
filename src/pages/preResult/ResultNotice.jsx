
import { useSearchParams } from 'react-router-dom';

import { PATH } from "../../data/paths";
import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { getReportAnswers } from '../../api/report'

import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';

import "./ResultNotice.css";

const ResultNotice = () => {
  const navigate = useNavigateWithScrollTop();
  const [searchParams] = useSearchParams();
  const interviewId = searchParams.get('interviewId');

  const handleCheckResult = () => {
    navigate(PATH.REPORT);
    getReportAnswers(interviewId)
  };

  return (
    <div className="result-page-wrapper">
      <NavbarComponent />
      <main className="result-main">
        <h1 className="title-24-bold title-center">방금 본 면접의 결과보고서를 생성할까요?</h1>
        <p className="error-text caption-14-regular">
          나가기 버튼을 누르면 결과 보고서가 생성되지 않아요.
        </p>
        <div className="button-group-02">
          <button className="outline-button" onClick={()=>{navigate(PATH.HOME)}}>나가기</button>
          <button className="filled-button" onClick={handleCheckResult}>결과 확인하기</button>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default ResultNotice;
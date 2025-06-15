import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { flushSync } from 'react-dom';

import { PATH } from "../../data/paths";
import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { getReportAnswers } from '../../api/report';

import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';

import "./ResultNotice.css";
import ReportGenerating from "./ReportGenerating";

const ResultNotice = () => {
  const navigate = useNavigateWithScrollTop();
  const [searchParams] = useSearchParams();
  const interviewId = searchParams.get('interviewId');

  const [isLoading, setIsLoading] = useState(false); // ✅ 로딩 상태

  const handleCheckResult = async () => {
    try {
      flushSync(() => {
        setIsLoading(true);
      })
      // 다음 프레임까지 기다려서 모달 렌더링 시간 확보
      await new Promise((resolve) => requestAnimationFrame(resolve));

      await getReportAnswers(interviewId);
      navigate(`${PATH.REPORT}?interviewId=${interviewId}`);
    } catch (error) {
      console.error('결과를 불러오는 데 실패했습니다:', error);
      alert('결과를 불러오는 중 오류가 발생했어요.');
      setIsLoading(false); // 오류 시 로딩 상태 해제
    }
  };

  if (isLoading) {
    return (
      <ReportGenerating />
    )
  } 
  return (
    <div className="result-page-wrapper">
      
      <NavbarComponent />
      <main className="result-main">
        <h1 className="title-24-bold title-center">방금 본 면접의 결과보고서를 생성할까요?</h1>
        <p className="error-text caption-14-regular">
          나가기 버튼을 누르면 결과 보고서가 생성되지 않아요.
        </p>
        <div className="button-group-02">
          <button className="outline-button" onClick={() => navigate(PATH.HOME)}>나가기</button>
          <button className="filled-button" onClick={handleCheckResult}>결과 확인하기</button>
        </div>
      </main>
      <Footer />
      
    </div>
  );
};

export default ResultNotice;

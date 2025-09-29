import React, { useState } from 'react';
import { Container, Button } from "@mui/material";
import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { PATH } from "../../data/paths";
import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';
import Step01 from './Step01';
import Step02 from './Step02';
import Step03 from './Step03';
import Step04 from './Step04';
import './Join.css';

const Join = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigateWithScrollTop()

  const steps = [
    { number: 1, label: '약관 동의' },
    { number: 2, label: '소셜 회원가입' },
    { number: 3, label: '정보 입력' },
    { number: 4, label: '가입 완료' },
  ];

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `/api/auth/${provider}`;  // 백엔드에서 해당 URL 처리 필요
  };

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "120px 0px 0px 0px",
        overflow: "hidden"
      }}
    >
      <NavbarComponent />

      <div className="join-container">
        <h2 className="join-header">회원가입</h2>
        <div className="join-stepper">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="join-step-item">
                <div className="join-circle-line-item">
                  <div className={`join-circle ${currentStep === step.number ? 'active' : ''}`}>
                    {step.number}
                    <span className="join-label">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && <hr className="join-line" />}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {currentStep === 1 && <Step01 onNext={handleNext} />}

      {currentStep === 2 &&
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "80px",
      gap: "10px" 
    }}
  >
    <Button
      variant="contained"
      color="primary"
      onClick={() => handleSocialLogin('kakao')}
      sx={{
        width: '280px',
        height: '48px',
        borderRadius: '8px',
        backgroundColor: '#FEE500',
        color: '#000',
        fontWeight: 600
      }}
    >
      카카오로 시작하기
    </Button>

    <Button
      variant="contained"
      color="primary"
      onClick={() => handleSocialLogin('google')}
      sx={{
        width: '280px',
        height: '48px',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        color: '#000',
        border: '1px solid #ccc',
        fontWeight: 600
      }}
    >
      구글로 시작하기
    </Button>

    <h4
      className="body-16-medium"
      style={{
        marginTop: "48px",
        cursor: "pointer",
        textAlign: "center"
      }}
      onClick={() => navigate(PATH.LOGIN)}
    >
      로그인 페이지로 돌아가기
    </h4>
  </div>
}


      {currentStep === 3 && <Step03 onNext={() => navigate(PATH.LOGIN)} />}
      <div style={{ height: "120px" }}></div>
      <Footer />
    </Container>
  );
};

export default Join;

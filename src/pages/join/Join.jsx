import React, { useState } from 'react';
import { Container } from "@mui/material";

import { useNavigateWithScrollTop } from '../../utils/useNavigateWithScrollTop';
import { PATH } from "../../data/paths";

import NavbarComponent from '../../components/Navbar';
import Step01 from './Step01';
import Step02 from './Step02';
import Step03 from './Step03';

import './Join.css';

const Join = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, label: '약관 동의' },
    { number: 2, label: '정보 입력' },
    { number: 3, label: '가입 완료' },
  ];

  // 다음 단계로 이동
  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "120px 240px",
        overflow: "hidden"
      }}
    >
      <NavbarComponent/>
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

      {/* 조건부 렌더링 */}
      {currentStep === 1 && <Step01 onNext={handleNext} />}
      {currentStep === 2 && <Step02 onNext={handleNext} />}
      {currentStep === 3 && <Step03 />}
    </Container>
  );
};

export default Join;

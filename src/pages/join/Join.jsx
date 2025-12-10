import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from "@mui/material";
import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { PATH } from "../../config/paths";
import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';
import Step01 from './Step01';
import './Join.css';

const Join = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const location = useLocation();
  
  const navigate = useNavigateWithScrollTop();

  const steps = [
    { number: 1, label: '약관 동의' },
    { number: 2, label: '소셜 회원가입' },
    { number: 3, label: '정보 입력' },
    { number: 4, label: '가입 완료' },
  ];

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  
  useEffect(() => {
    const q = location.search;
    const s = Number(new URLSearchParams(q).get('step'));
    if (s >= 1 && s <= 4) setCurrentStep(s);
  }, [location.search]);

  return (
    <Container
      maxWidth={false}
      style={{
        // backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "120px 0 0",
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

      {/* Step 분기 */}
      {currentStep === 1 && <Step01 onNext={handleNext} />}
      {/* {currentStep === 2 && <Step02 toLogin={() => navigate(PATH.LOGIN)} />} */}
      {/* {currentStep === 3 && <Step03 />} */}
      {/* {currentStep === 4 && <Step04 onNext={() => navigate(PATH.LOGIN)} />} */}

      <div style={{ height: 120 }} />
      <Footer />
    </Container>
  );
};

export default Join;

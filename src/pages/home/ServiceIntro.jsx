/**
 * @file ServiceIntro.jsx
 * @description 홈 - 서비스 인트로
 * @author 이찬우
 * @created 2025-04-04
 * @lastModified 2025-04-04
**/

import React from 'react';

import "./Home.css"

const ServiceIntro = ({scrollY}) => {
    const vh = (window.innerHeight);
    const fadeFactor = scrollY / vh;

    const opacity =
    fadeFactor < 0.5
      ? 0
      : fadeFactor > 4
        ? 1
        : 1.2 - Math.abs(fadeFactor - 1);

  // translateY: 40px → 0 → -40px
  const translateY =
    fadeFactor < 0.5
      ? 40
      : fadeFactor > 4
        ? -40
        : (1.5 - fadeFactor) * 80;

    return (
        <div className="overflow-hidden center-horizontal center-vertical child-column-center" style={{ width: "100vw", height:"auto", position:"relative", marginTop: "100vh", paddingTop:"40vh", background:"linear-gradient(to top, var(--background-color) 80%, transparent 100%)"}}>
            {/* <div style={{ width: "700px", opacity: opacity>0.5? opacity:0, transform: opacity>0.7 ? 'translateY(0px)' : 'translateY(40px)', transition: "opacity 0.3s ease-out, transform 0.6s ease-out"}}>  */}
            <div style={{ 
                width: "700px",
                opacity: opacity,
                transform: `translateY(${translateY}px)`,
                transition: "opacity 0.2s ease, transform 0.4s ease"
                }}>
                <div className="child-column">
                    {/* <GradientBorderH1 text="01" border="3px" fontSize="3rem" margin="10px -5px"></GradientBorderH1> */}
                    <h1 style={{color:"var(--system-gray3)", fontSize:"3rem", marginBottom:"10px"}}>01</h1>
                    <h1 style={{
                        fontFamily: 'Freesentation',
                        fontSize: "3.5rem",
                        fontWeight: "900",
                        padding: "0px",
                        margin: "0px",
                        color: "var(--text-color)"
                        }}
                    ><span className="gradient-text">면접</span>, 새롭게 정의하다.</h1>
                    <h1 style={{
                        fontFamily: 'Freesentation',
                        fontSize: "3.5rem",
                        fontWeight: "900",
                        padding: "0px",
                        margin: "0px",
                        color: "var(--text-color)"
                        }}
                    ><span className="gradient-text">핏터뷰</span>만의 프리미엄 서비스
                    </h1>
                    <h4 style={{fontSize:"24px", marginTop:"10px", color:"var(--system-darkgray)"}}>AI 면접관과 함께하는 실전 면접 훈련 <br /></h4>
                    {/* <h4 style={{fontSize:"24px", marginTop:"10px", color:"var(--system-darkgray)"}}>AI 면접관과 함께하는 실전 면접 훈련 <br />실제 대학 면접과 유사한 환경에서 맞춤형 질문을 받고, 즉각적인 피드백을 받아보세요.</h4> */}
                </div>
            <img src="./images/mockup/macbook.webp" alt="mockup" style={{marginBottom:"20px"}}/>
            </div>
        </div>
    );
};

export default ServiceIntro;

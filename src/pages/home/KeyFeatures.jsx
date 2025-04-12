/**
 * @file KeyFeatures.jsx
 * @description 홈 - 주요 서비스
 * @author 이찬우
 * @created 2025-04-08
 * @lastModified 2025-04-08
**/
import React from 'react';

import "./Home.css"

const KeyFeatures = ({scrollY}) => {
    const vh = (window.innerHeight*2);
    const fadeFactor = scrollY / vh;

    const opacity =
    fadeFactor < 0.5
      ? 0
      : fadeFactor > 4
        ? 1
        : 1.2 - Math.abs(fadeFactor - 1);
        
    const translateY =
        fadeFactor < 0.5
        ? 40
        : fadeFactor > 4
            ? -40
            : (1 - fadeFactor) * 80;


    return (
    <div className="overflow-hidden center-horizontal center-vertical child-column-center" style={{ width: "100wv", height:"auto", position:"relative", paddingTop:"30vh", background:"var(--background-color)"}}>
        <div style={{ 
            width: "700px",  
            opacity: opacity,
            transform: `translateY(${translateY}px)`,
            transition: "opacity 0.2s ease, transform 0.4s ease"
            }}>
            <div class="mine messages">
                <div class="message last">
                    <h2 style={{margin:"0px", padding:"6px 12px", color:"var(--background-color)", fontWeight:"400"}}>기출 문제만 계속 돌리고 있는데, 이걸로 충분할까...?</h2>
                </div>
            </div>
            <div className="yours messages">
                {/* <div class="message">
                    <h2 style={{margin:"0px", padding:"6px 12px", fontWeight:"400"}}>핏터뷰 써봐</h2>
                </div> */}
                <div class="message last">
                    <h2 style={{margin:"0px", padding:"6px 12px", fontWeight:"400"}}>핏터뷰 써봐!</h2>
                </div>
            </div>
            <h1 style={{ fontWeight:"800", fontSize:"3rem"}}>
                <span className="gradient-text">생기부 업로드</span>만 하면
                <br/>
                나에게 맞는 질문이 자동 생성
                </h1>
            <div>
                <span style={{fontSize:"24px", fontWeight: "600"}}>
                    내 생기부를 업로드하면
                    <br />
                    AI 면접관이 지원자의 활동·관심사를 분석해 
                    <br />
                    맞춤형 질문을 자동 생성합니다.
                </span>
                <br />
                <span style={{fontSize:"24px"}}>
                    실제 면접에서 나올 법한 질문을 연습하고, 논리적이고 일관성 있는 답변을 준비하세요!
                </span>
            </div>
        </div>
    </div>
    );
};

export default KeyFeatures;
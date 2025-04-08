/**
 * @file KeyFeatures.jsx
 * @description 모의면접 실행 페이지 - 주요 서비스
 * @author 이찬우
 * @created 2025-04-08
 * @lastModified 2025-04-08
**/
import React from 'react';

import "./Home.css"

const KeyFeatures = ({scrollY}) => {
    const opacity = Math.min(scrollY / (window.innerHeight * 2), 1);

    return (
    <div className="overflow-hidden center-horizontal center-vertical child-column-center" style={{ width: "100wv", height:"auto", position:"relative", paddingTop:"20vh", background:"var(--background-color)"}}>
        <div style={{ width: "700px"}}>
            <h1 style={{ fontWeight:"800", fontSize:"3rem", opacity: opacity>0.5? opacity:0, transform: opacity>0.7 ? 'translateY(0px)' : 'translateY(40px)', transition: "opacity 0.3s ease-out, transform 0.6s ease-out"}}>
                <span className="gradient-text">생기부 업로드</span>만 하면
                <br/>
                나에게 맞는 질문이 자동 생성
                </h1>
            <div>
        
                면접 준비, 더 이상 고민하지 마세요."

                내 생기부를 업로드하면, AI가 지원자의 전공·활동·관심사를 분석해 맞춤형 질문을 자동 생성합니다.

                실제 면접에서 나올 법한 질문을 연습하고, 논리적이고 일관성 있는 답변을 준비하세요!
            </div>
        </div>
    </div>
    );
};

export default KeyFeatures;
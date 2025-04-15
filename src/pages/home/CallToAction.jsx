/**
 * @file CallToAction.jsx
 * @description 모의면접 실행 페이지 - 서비스 인트로
 * @author 이찬우
 * @created 2025-04-11
 * @lastModified 2025-04-11
**/

import React from 'react';

import { Grid } from "@mui/material";
import { NeumorphicCardHover } from "../../components/CustomCard"
import "./Home.css"

// const CallToAction = ({scrollY}) => {
const CallToAction = () => {
    return (
        <div className="overflow-hidden center-horizontal center-vertical child-column-center" style={{ width: "100wv", height:"auto", position:"relative", paddingTop:"40vh", background:"linear-gradient(to top, var(--background-color) 80%, transparent 100%)"}}>
            <Grid container spacing={3} justifyContent="center" alignItems="center" width={"710px"}>
                <Grid item xs={6}>
                <NeumorphicCardHover>
                    <br/>
                    <img className="emoji" src="./images/emoji/technologist-light-skin-tone.webp" alt="emoji"/>
                    <h2>지원 학교, 학과별 기출 질문</h2>
                    <div>
                        <p>준비하는 학교의<br/><strong>최신 기출 질문</strong>으로 연습해보세요.</p>
                    </div>
                </NeumorphicCardHover>
                </Grid>
                <Grid item xs={6}>
                <NeumorphicCardHover>
                    <br/>
                    <img className="emoji" src="./images/emoji/technologist-light-skin-tone.webp" alt="emoji"/>
                    <h2>생기부 기반 맞춤 질문</h2>
                    <div>
                        <p><strong>생활기록부</strong>를 업로드 하면<br/><strong>AI 면접관</strong>이 예상 질문을 만들어 줘요.</p>
                    </div>
                </NeumorphicCardHover>
                </Grid>
                <Grid item xs={6}>
                <NeumorphicCardHover>
                    <br/>
                    <img className="emoji" src="./images/emoji/technologist-light-skin-tone.webp" alt="emoji"/>
                    <h2>n가지 유형의 AI 면접관</h2>
                    <div>
                        <p><strong>논리적인 교수부터 까다로운 교수까지,</strong><br/>여러 유형의 면접관들을 경험해보세요.</p>
                    </div>
                </NeumorphicCardHover>
                </Grid>
                <Grid item xs={6}>
                <NeumorphicCardHover>
                    <br/>
                    <img className="emoji" src="./images/emoji/technologist-light-skin-tone.webp" alt="emoji"/>
                    <h2>나에게 딱 맞는 피드백</h2>
                    <div>
                        <p><strong>최첨단 AI</strong>와 함께<br/>나의 답변을 분석하고 개선 해보세요.</p>
                    </div>
                </NeumorphicCardHover>
                </Grid>
            </Grid>
            <br/>
        </div>
    );
};

export default CallToAction;
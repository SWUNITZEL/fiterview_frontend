/**
 * @file ServiceIntro.jsx
 * @description 모의면접 실행 페이지 - 서비스 인트로
 * @author 이찬우
 * @created 2025-01-04
 * @lastModified 2025-04-04
**/

import React, {useState, useEffect} from 'react';

import {GradientH1, GradientBorderH1} from "../../components/CustomH1";
import { Grid } from "@mui/material";
import "./Home.css"

const ServiceIntro = ({scrollY}) => {
    const opacity = Math.min(scrollY / 250, 1);

    return (
        <div className="overflow-hidden center-horizontal center-vertical child-column-center" style={{ width: "100wv", height:"auto", position:"relative", marginTop: "100vh", paddingTop:"40vh", background:"linear-gradient(to top, var(--background-color) 80%, transparent 100%)"}}>
            <div style={{ width: "60%", opacity, transition: "opacity 1.5s ease-out, transform 0.6s ease-out"}}>
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
                    ><span style={{
                        fontFamily: 'Freesentation',
                        fontSize: "3.5rem",
                        fontWeight: "900",
                        background: "var(--gradient-1)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        }}>면접</span>, 새롭게 정의하다.</h1>
                    <h1 style={{
                        fontFamily: 'Freesentation',
                        fontSize: "3.5rem",
                        fontWeight: "900",
                        padding: "0px",
                        margin: "0px",
                        color: "var(--text-color)"
                        }}
                    ><span style={{
                        fontFamily: 'Freesentation',
                        fontSize: "3.5rem",
                        fontWeight: "900",
                        background: "var(--gradient-1)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        }}>핏터뷰</span>에서만 제공하는 프리미엄 서비스
                    </h1>
                    <h4 style={{fontSize:"24px", marginTop:"10px", color:"var(--system-darkgray)"}}>AI 면접관과 함께하는 실전 면접 훈련 <br />실제 대학 면접과 유사한 환경에서 맞춤형 질문을 받고, 즉각적인 피드백을 받아보세요.</h4>
                </div>

            </div>
            

            <h1></h1>
            
            <Grid container spacing={3} justifyContent="center" alignItems="center" width={"60%"}>
                <Grid item xs={6}>
                <div className="neumorphic-box">
                    <img className="emoji" src="./images/emoji/technologist-light-skin-tone.webp" alt="emoji"/>
                    <h1>모든 유형의 질문 제공!</h1>
                </div>
                </Grid>
                <Grid item xs={6}>
                <div className="neumorphic-box">
                    <h1>혼자하는 연습은 이제 그만!</h1>
                </div>
                </Grid>
                <Grid item xs={6}>
                <div className="neumorphic-box">
                    <h1>모든 유형의 질문 제공</h1>
                </div>
                </Grid>
                <Grid item xs={6}>
                <div className="neumorphic-box">
                    <h1>혼자하는 연습은 이제 그만!</h1>
                </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default ServiceIntro;

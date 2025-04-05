/**
 * @file MainBanner.jsx
 * @description 홈 - 메인배너
 * @author 이찬우
 * @created 2025-01-04
 * @lastModified 2025-04-03
**/

import React, {useState, useEffect} from 'react';

import { FaAngleRight, FaCaretRight    } from "react-icons/fa6";
import DotText from "../../components/DotText";
import CustomButton from "../../components/CustomButton";
import {GradientH1} from "../../components/CustomH1";
import { keyframes } from "@emotion/react";

import "./Home.css"

const MainBanner = () => {

  const [isVisible, setIsVisible] = useState(false);
  const shake = keyframes`
    0% { transform: translateX(0); }
    20% { transform: translateX(-5px); }
    40% { transform: translateX(5px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
    100% { transform: translateX(0); }
  `;

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <div className="full-screen center-vertical child-column gradient-loop" style={{position: "fixed", transition: "transform 0.3s ease-in-out"}}>
      <div  
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0px)" : "translateY(50px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          marginTop: "30vh", 
          marginLeft: "10vw"
        }}
      >
        <div className="child-column" style={{marginBottom:"-5px"}}>
          {/* <img className="emoji" src="/images/emoji/desktop-computer.webp" alt="emoji"></img> */}
          {/* <GradientH1 fontFamily = "Sofia" fontSize="9rem" text="Fiterview" /> */}
          <GradientH1 fontWeight = "800" fontSize="8rem" letterSpacing = "-7px" text="Fiterview" />
          <p style={{
                      paddingTop:"0px", 
                      marginTop:"0px",
                      fontSize: "24px"
                      // marginLeft:"1.5rem"
                      }}>
            AI 면접관과 함께 실전 대비!&nbsp;
          <strong style={{fontWeight: "600", fontSize: "24px"}}>
            <DotText dotSize="28px" fontSize = "24px" dotTop="-20px" spacing="12px">맞춤형</DotText>&nbsp;
            <DotText dotSize="28px" fontSize = "24px" dotTop="-20px" spacing="8px">대학</DotText>&nbsp;
            <DotText dotSize="28px" fontSize = "24px" dotTop="-20px" spacing="8px">면접</DotText>&nbsp;
            <DotText dotSize="28px" fontSize = "24px" dotTop="-20px" spacing="8px">연습</DotText>&nbsp;
            플랫폼
          </strong>
          </p>          
        </div>
        <CustomButton 
        variant="text" 
        bgColor="transparent" 
        hoverBgColor="transparent" 
        textColor="var(--text-color)" 
        hoverTextColor="var(--primary-hover)" 
        rippleColor="var(--background-color)"
        margin="-20px 0px"
        // margin="-10px 1.5rem"
        padding='0px'
        endIcon={<FaCaretRight   style={{ color: "var(--primary-hover)" }}/> }
        onClick={() => console.log("clicked")}>
          <span style={{fontSize:"32px",fontWeight:"700", letterSpacing:"-1px"}}>지금 바로 시작하기</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default MainBanner;

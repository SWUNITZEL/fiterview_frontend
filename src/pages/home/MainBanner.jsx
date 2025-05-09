/**
 * @file MainBanner.jsx
 * @description 홈 - 메인배너
 * @author 이찬우
 * @created 2025-01-04
 * @lastModified 2025-04-03
**/

import React, {useState, useEffect} from 'react';

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import DotText from "../../components/DotText";
import CustomButton from "../../components/CustomButton";
import {GradientH1} from "../../components/CustomH1";

import "./Home.css"

const MainBanner = ({scrollY}) => {

  const [isVisible, setIsVisible] = useState(false);
  const contentsOpacity = Math.max(0, Math.min(1, 1 - (scrollY - 0) / (5)));
  const backgroundOpacity = Math.max(0, Math.min(1, 1 - (scrollY - 200) / (400)));

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <div className="full-screen center-both child-column gradient-loop" 
    style={{opacity: isVisible ? backgroundOpacity : 0, position: "fixed", transition: "transform 0.3s ease-in-out"}}>
      <div  className="center-screen child-column-center"
        style={{
          opacity: isVisible ? contentsOpacity : 0,
          transform: isVisible ? "translateY(0px)" : "translateY(50px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          // marginTop: "30vh", 
        }}
      >
        <div className="child-column-center" style={{marginBottom:"-5px"}}>
          {/* <img className="emoji" src="/images/emoji/desktop-computer.webp" alt="emoji"></img> */}
          {/* <GradientH1 fontFamily = "Sofia" fontSize="9rem" text="Fiterview" /> */}
          <GradientH1 fontWeight = "800" fontSize="8rem" letterSpacing = "-7px" text="Fiterview" />
          <p style={{
                      paddingTop:"0px", 
                      marginTop:"0px",
                      fontSize: "20px"
                      // marginLeft:"1.5rem"
                      }}>
            AI 면접관과 함께 실전 대비!&nbsp;
          <strong style={{fontWeight: "500", fontSize: "20px"}}>
            <DotText dotSize="24px" fontSize = "20px" dotTop="-15px" spacing="6px">맞춤형</DotText>&nbsp;
            <DotText dotSize="24px" fontSize = "20px" dotTop="-15px" spacing="4px">대학</DotText>&nbsp;
            <DotText dotSize="24px" fontSize = "20px" dotTop="-15px" spacing="4px">면접</DotText>&nbsp;
            <DotText dotSize="24px" fontSize = "20px" dotTop="-15px" spacing="4px">연습</DotText>&nbsp;
            플랫폼
          </strong>
          </p>          
        </div>
        <CustomButton 
        zIndex="9999"
        variant="text" 
        bgColor="transparent" 
        hoverBgColor="transparent" 
        textColor="var(--primary-40)" 
        hoverTextColor="var(--primary-40)" 
        rippleColor="var(--primary-20)"
        margin="10px 0px"
        // margin="-10px 1.5rem"
        // padding='0px'
        borderRadius="30px"
        endIcon={<ChevronRightIcon   style={{ color: "var(--primary-40)" }}/> }
        onClick={() => console.log("clicked")}>
          <span style={{color:"var(--primary-40)", fontSize:"24px", letterSpacing:"-1px"}}>지금 바로 시작하기</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default MainBanner;
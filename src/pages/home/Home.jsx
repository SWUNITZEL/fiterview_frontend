import React, { useState, useEffect } from 'react';
import { Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavbarComponent from '../../components/Navbar';
import FullBanner from '../../components/FullBanner';

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();

/**
 * @file Home.jsx
 * @description 홈
 * @author 이찬우
 * @created 2025-01-04
 * @lastModified 2025-04-03
**/

import React, {useState, useEffect} from 'react';
import { Container } from "@mui/material";
import NavbarComponent from '../../components/Navbar'
// import { AnimatedLandingText } from "../../components/AnimatedLandingText"
import "./Home.css"
import MainBanner from "./MainBanner.jsx"
import ServiceIntro from "./ServiceIntro.jsx"
import KeyFeatures from "./KeyFeatures.jsx"
import CallToAction from "./CallToAction.jsx"

function Home() {
  /**
   * @state {number} scrollY - 스크롤 위치
   */
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0 0",
      }}
    >
      <NavbarComponent />
      <h2>Home!</h2>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate("/document-selection")} 
        style={{ marginTop: "20px" }}
      >
        면접 전 문서 선택
      </Button>
        overflow: "hidden"
      {/* <AnimatedLandingText /> */}
      <NavbarComponent 
      scrollY={scrollY} 
      bgColor="transparent"
      textColor="var(--text-color)"
      isBoxShadow="none"
      />
      <MainBanner scrollY={scrollY} />
      <ServiceIntro scrollY={scrollY}/>
      <KeyFeatures scrollY={scrollY}/>
      <CallToAction scrollY={scrollY}/>
    </Container>
  );
}

export default Home;

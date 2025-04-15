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
    <Container maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0 0",
        overflow: "hidden"
      }}>
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
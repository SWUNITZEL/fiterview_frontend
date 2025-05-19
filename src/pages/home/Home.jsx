/**
 * @file Home.jsx
 * @description 홈
 * @author 이찬우
 * @created 2025-01-04
 * @lastModified 2025-04-03
**/

import React
// , {useState, useEffect} 
from 'react';
import { Container } from "@mui/material";
import NavbarComponent from '../../components/Navbar'
import "./Home.css"

function Home() {
  /**
   * @state {number} scrollY - 스크롤 위치
   */
  // const [scrollY, setScrollY] = useState(0);
  
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <Container maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0 0",
        overflow: "hidden"
      }}>
      <NavbarComponent />

      
      
    </Container>
  );
}

export default Home;
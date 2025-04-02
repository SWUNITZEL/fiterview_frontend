import React, { useState, useEffect } from 'react';
import { Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavbarComponent from '../../components/Navbar';
import FullBanner from '../../components/FullBanner';

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
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
    </Container>
  );
}

export default Home;
